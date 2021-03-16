import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryComponent implements OnInit {
  images = [];
  constructor(private camera: Camera) {

  }

  takePhoto() {
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
    }, (err) => {
      console.log(err)
      // Handle error
    });
  }
  ngOnInit(): void {
  }
  uploadImage(event) {
    const reader = new FileReader();
    let x;
    const i = this;
    const file = event.target.files[0];
    console.log(event.target.files)
    reader.readAsDataURL(file);
    reader.onload = function () {
      x = reader.result;
      i.images.push(x);
      //me.modelvalue = reader.result;
      // console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

}
