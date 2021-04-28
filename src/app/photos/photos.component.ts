import { Component, OnInit } from '@angular/core';
import { Photo } from './photo-model';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  photos: Photo[];
  photoList: Photo[];
  compareImages: Photo[] = [];
  imageMap = new Map()

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.photoListObs.subscribe(res => {
      this.photos = res;
      this.photoList = this.photos.slice(0, 12);
    })
    this.photoService.getPhotos();
  }

  onClickPage(event: any) {
    const start = (event.page - 1) * event.itemsPerPage;
    const end = event.page * event.itemsPerPage;

    this.photoList = this.photos.slice(start, end);
  }

  onCompare(photo: Photo) {
    this.compareImages.push(photo);
    this.imageMap.set(photo.id, { added: true, index: this.compareImages.length - 1 });
  }

  onRemove(photo: Photo) {
    this.compareImages.splice(this.imageMap.get(photo.id).index, 1);
    this.imageMap.delete(photo.id);
    this.initImageMap();
  }

  initImageMap() {
    this.compareImages.map((value, index) => {
      this.imageMap.set(value.id, { added: true, index: index })
    });
  }

}
