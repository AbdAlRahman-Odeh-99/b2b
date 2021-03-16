import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasedUrlsConstants } from '@app/core/constants/routes';
import { generateId } from '@app/shared/functions/generate-id';


@Injectable({
  providedIn: 'root'
})
export class SearchByImageService {

  baseUrl: string = BasedUrlsConstants.BASED_URL_SEARCH_BY_IMAGE;


  constructor(
    private http: HttpClient
  ) { }

    base64ToArrayBuffer(base64: string) {
      // tslint:disable-next-line: variable-name
      const binary_string = atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
  }


  searchByImage(image: string): Observable<any> {
    const name = generateId();
    // tslint:disable-next-line: max-line-length
    return this.http.post(`${this.baseUrl}/get-image-name/${name}`, {img: image.split('base64,')[1]});
  }
}
