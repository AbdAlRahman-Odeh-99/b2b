import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsertProductComponent implements OnInit {
  images = [];
  isLoading = false;
  loadType = '';
  constructor(private camera: Camera) { }
  takePhoto() {
    this.isLoading = true;
    this.loadType = 'takePhoto';
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.images.push('data:image/jpeg;base64,' + imageData);
      this.isLoading = false;
      this.loadType = '';
    }, (err) => {
      console.log(err)
      // Handle error
      this.isLoading = false;
      this.loadType = '';
    });
  }
  ngOnInit(): void {
  }
  uploadImage(event) {
    this.isLoading = true;
    this.loadType = 'uploadImage';
    const reader = new FileReader();
    const i = this;
    const file = event.target.files[0];
    console.log(event.target.files)
    reader.readAsDataURL(file);
    reader.onload = function () {
      i.images.push(reader.result);
      i.isLoading = false;
      i.loadType = '';
      //me.modelvalue = reader.result;
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      i.isLoading = false;
      i.loadType = '';
    };
  }

}
