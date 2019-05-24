import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ImgurImage} from '../../../models/imgur-image.model';

@Component({
  selector: 'ngd-gallery-preview-item',
  templateUrl: './gallery-preview-item.component.html',
  styleUrls: ['./gallery-preview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryPreviewItemComponent {
  @Input() item: ImgurImage;
  @Output() details = new EventEmitter<ImgurImage>();

  notifyShowDetails(): void {
    this.details.emit(this.item);
  }
}
