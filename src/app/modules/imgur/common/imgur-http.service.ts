import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ImgurImage} from './imgur-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImgurHttpService {

  serviceBase: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceBase = `${environment.imgurApiBase}/${environment.imgurApiVersion}`;
  }

  getImagesForLoggedInAccount() {
    const endpoint = `${this.serviceBase}/account/me/images`;
    console.log(endpoint);
    return this._httpClient.get(endpoint)
      .pipe(
        map((response: any) =>
          response.data.map((imageJSON) =>
            new ImgurImage(Object.assign(imageJSON, {
                datetime: imageJSON.datetime * 1000
              })
            )
          )
        )
      );
  }

}
