import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ImgurImage} from '../models/imgur-image.model';
import {ImageUploadData} from '../models/image-upload-data.interface';
import {flatten} from 'lodash-es';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgurHttpService {

  serviceBase: string;

  constructor(private _httpClient: HttpClient) {
    this.serviceBase = `${environment.imgurApiBase}/${environment.imgurApiVersion}`;
  }

  getImagesForLoggedInAccount(page: number): Observable<Array<ImgurImage>> {
    const endpoint = `${this.serviceBase}/account/me/images/${page}`;

    return this._httpClient.get(endpoint)
      .pipe(
        map((response: any) => this._parseAndFlattenGalleryImagesData(response.data))
      );
  }

  getTopImages(page: number): Observable<Array<ImgurImage>> {
    const endpoint = `${this.serviceBase}/gallery/top/top/all/${page}`;

    return this._httpClient.get(endpoint)
      .pipe(
        map((response: any) => this._parseAndFlattenGalleryImagesData(response.data))
      );
  }

  /**
   * Recursively go into each response item, if it's an album, it should contain an array of images
   * #https://api.imgur.com/models/gallery_album
   */
  private _parseAndFlattenGalleryImagesData(responseData: Array<any>): Array<ImgurImage> {
    return flatten(
      responseData.map((imageJSON) => {
        if (imageJSON.is_album) {
          return this._parseAndFlattenGalleryImagesData(imageJSON.images);
        } else {
          return new ImgurImage(imageJSON);
        }
      })
    );
  }

  uploadImage(imageData: ImageUploadData): Observable<any> {
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
