import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Photo } from './photo-model';

const URL = 'https://jsonplaceholder.typicode.com/photos';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photosList = new Subject<any>();
  photoListObs = this.photosList.asObservable();


  constructor(private http: HttpClient) { }

  getPhotos() {
    this.http.get<Photo[]>(URL).subscribe(res => {
      this.photosList.next(res);
    });
  }
}
