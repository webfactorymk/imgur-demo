import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ImgurImage} from './imgur-image.model';
import {ImageUploadData} from './image-upload-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ImgurHttpService {

  serviceBase: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceBase = `${environment.imgurApiBase}/${environment.imgurApiVersion}`;
  }

  getImagesForLoggedInAccount(page: number) {
    const endpoint = `${this.serviceBase}/account/me/images/${page}`;

    return this._httpClient.get(endpoint)
      .pipe(
        map((response: any) =>
          response.data.map((imageJSON) =>
            new ImgurImage(Object.assign(imageJSON, {
              datetime: imageJSON.datetime * 1000
            }))
          )
        )
      );
  }

  uploadImage(imageData: ImageUploadData) {
    const endpoint = `${this.serviceBase}/image`;

    // Imgur does not need the initial data:image/jpeg;base64, so we remove it in the service here.
    // Some other image provider may need it so we handle it per provider
    const imageUrlParts = imageData.image.split(',');
    imageData = Object.assign(imageData, {
      image: imageUrlParts[1]
    });

    // Since the image is base64 encoded, there is no need for multipart/form-data requests
    return this._httpClient.post(endpoint, imageData);
  }
}
