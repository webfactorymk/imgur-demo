import {Observable} from 'rxjs';

export class FileUtils {
  static observeFileReading(file): Observable<string> {
    return Observable.create((observer) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (event: ProgressEvent) => {
        if (event && event.target && (event.target as FileReader).result) {
          observer.next((event.target as FileReader).result);
          observer.complete();
        } else {
          observer.error();
          observer.complete();
        }
      }, false);

      fileReader.readAsDataURL(file);
    });
  }
}
