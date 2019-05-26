import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CanvasWhiteboardComponent, CanvasWhiteboardOptions} from 'ng2-canvas-whiteboard';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {ImgurHttpService} from '../../common/services/imgur-http.service';
import {FileUtils} from '../../../shared/util/file.utils';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogData} from '../../../shared/confirmation-dialog/confirmation-dialog-data.interface';

@Component({
  selector: 'ngd-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesUploadComponent implements OnInit {
  @ViewChild(CanvasWhiteboardComponent) canvasWhiteboard: CanvasWhiteboardComponent;
  @ViewChild('fileUploadInput') fileUploadInput: ElementRef;

  imageUploadForm: FormGroup;
  isImageUploadInProgress = false;

  canvasWhiteboardOptions: CanvasWhiteboardOptions = {
    aspectRatio: 0.5,
    drawButtonEnabled: false,
    drawingEnabled: true,
    drawButtonText: 'Draw',
    clearButtonEnabled: true,
    clearButtonText: 'Clear',
    undoButtonText: 'Undo',
    undoButtonEnabled: true,
    redoButtonText: 'Redo',
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    saveDataButtonEnabled: false,
    lineWidth: 3,
    strokeColor: 'rgb(0,0,0)',
    shouldDownloadDrawing: false
  };

  constructor(private _router: Router,
              private _formBuilder: FormBuilder,
              private _changeDetector: ChangeDetectorRef,
              private _snackBar: MatSnackBar,
              private _matDialog: MatDialog,
              private _imgurHttpService: ImgurHttpService) {
  }

  ngOnInit() {
    this._initForm();
  }

  private _initForm() {
    this.imageUploadForm = this._formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      description: ['']
    });
  }

  selectedImageChanged(selectedImage: File) {
    if (selectedImage && (/^image\//.test(selectedImage.type))) {
      const readFileSubscription = FileUtils.observeFileReading(selectedImage)
        .subscribe((fileDataUrl: string) => {
          readFileSubscription.unsubscribe();
          this.fileUploadInput.nativeElement.value = '';

          this.imageUploadForm.get('image').setValue(fileDataUrl);
          this.canvasWhiteboardOptions = Object.assign(this.canvasWhiteboardOptions, {
            imageUrl: fileDataUrl
          });

          this._changeDetector.detectChanges();
        }, () => {
          readFileSubscription.unsubscribe();
        });
    } else {
      this.fileUploadInput.nativeElement.value = '';
      this._snackBar.open('The uploaded file is not a valid image.', 'Dismiss');
    }
  }

  openUploadDialog(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.fileUploadInput.nativeElement.click();
  }

  uploadImage() {
    this._saveLatestCanvasEditedImage();

    if (this.imageUploadForm.valid && !this.isImageUploadInProgress) {
      this.isImageUploadInProgress = true;
      this._changeDetector.detectChanges();

      const formValue = this.imageUploadForm.value;

      this._imgurHttpService.uploadImage({
        image: formValue.image,
        title: formValue.title,
        description: formValue.description,
        type: 'base64'
      })
        .subscribe(() => {
          this.isImageUploadInProgress = false;
          this.imageUploadForm.reset();
          this._changeDetector.detectChanges();

          this._snackBar.open('Image uploaded successfully', 'Dismiss');

          this._openRedirectConfirmationDialog();
        }, (err) => {
          this.isImageUploadInProgress = false;
          this._snackBar.open(`Image upload failed. The error was: ${err.message}`, 'Dismiss');
          this._changeDetector.detectChanges();
        });
    }
  }

  fileDropped(event: UploadEvent) {
    if (event && event.files && event.files.length) {
      if (event.files[0].fileEntry.isFile) {
        (event.files[0].fileEntry as FileSystemFileEntry).file(fileInfo => {
          this.selectedImageChanged(fileInfo);
        });
      }
    }
  }

  private _saveLatestCanvasEditedImage() {
    // We could listen to the canvas changes for draw, edit, undo, clear to get the data realtime
    // But for now there is no need since we only need the finished image before we upload
    const savedImageBase64 = this.canvasWhiteboard.generateCanvasDataUrl();
    this.imageUploadForm.get('image').setValue(savedImageBase64);

    this._changeDetector.detectChanges();
  }

  private _openRedirectConfirmationDialog() {
    const dialogData: ConfirmationDialogData = {
      title: 'Well done!',
      description: '<p>The image has been uploaded successfully!</p>' +
        '<p>Do you want to continue uploading images?</p>',
      confirmText: 'Yes!',
      cancelText: 'No, go to overview'
    };

    const dialogSubscription = this._matDialog.open(ConfirmationDialogComponent, {
      minWidth: '40vw',
      data: dialogData
    })
      .afterClosed()
      .subscribe((continueUploading: boolean) => {
        dialogSubscription.unsubscribe();

        if (!continueUploading) {
          this._router.navigate(['/imgur']);
        }
      }, () => {
        dialogSubscription.unsubscribe();
      });
  }
}
