import {Component, OnInit} from '@angular/core';
import {ImgurHttpService} from '../../services/imgur-http.service';
import {ImgurImage} from '../../models/imgur-image.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngd-imgur-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  accountImages$: Observable<Array<ImgurImage>>;

  constructor(private _imgurHttpService: ImgurHttpService) {
  }

  ngOnInit() {
    this.accountImages$ = this._imgurHttpService.getImagesForLoggedInAccount();
    // .subscribe((accountImages: Array<ImgurImage>) => {
    //   console.log(result);
    // });
  }

  trackByImageIdFn(index, item) {
    return item ? item.id : index;
  }
}
