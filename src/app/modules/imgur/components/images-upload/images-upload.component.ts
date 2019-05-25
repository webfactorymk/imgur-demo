import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileUtils} from '../../../shared/util/file.utils';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CanvasWhiteboardComponent, CanvasWhiteboardOptions} from 'ng2-canvas-whiteboard';
import {ImgurHttpService} from '../../common/imgur-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileSystemFileEntry, UploadEvent} from 'ngx-file-drop';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';

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
    drawButtonClass: 'drawButtonClass',
    drawButtonText: 'Draw',
    clearButtonEnabled: true,
    clearButtonClass: 'clearButtonClass',
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
              private _changeDetector: ChangeDetectorRef,
              private _formBuilder: FormBuilder,
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
        image: formValue.image.split(',')[1],
        title: formValue.title,
        description: formValue.description,
        type: 'base64'
      })
        .subscribe(() => {
          this.isImageUploadInProgress = false;
          this.imageUploadForm.reset();
          this._changeDetector.detectChanges();

          this._snackBar.open('Image uploaded successfully', 'Dismiss');

          this.openRedirectConfirmationDialog();

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
    const savedImageBase64 = this.canvasWhiteboard.generateCanvasDataUrl();
    this.imageUploadForm.get('image').setValue(savedImageBase64);

    this._changeDetector.detectChanges();
  }

  openRedirectConfirmationDialog() {
    this._matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Action required',
        description: 'You will be redirected to your Imgur overview, do you wish to proceed or continue uploading more images?',
        confirmText: 'Proceed to gallery',
        cancelText: 'Continue uploading'
      }
    })
      .afterClosed()
      .subscribe((shouldProceedToGallery) => {
        if (shouldProceedToGallery) {
          this._router.navigate(['/imgur']);
        }
      });
  }
}
