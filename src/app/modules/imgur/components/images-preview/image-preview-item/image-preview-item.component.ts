import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ImgurImage} from '../../../common/imgur-image.model';

@Component({
  selector: 'ngd-gallery-preview-item',
  templateUrl: './image-preview-item.component.html',
  styleUrls: ['./image-preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagePreviewItemComponent {
  @Input() item: ImgurImage;
  @Output() details = new EventEmitter<ImgurImage>();

  notifyShowDetails(): void {
    this.details.emit(this.item);
  }
}
