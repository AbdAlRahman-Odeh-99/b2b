import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadImageComponent implements OnInit {
  isLoading: boolean = false;
  @Output('getImageAsBase64') getImageAsBase64: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  uploadImage(event) {
    this.isLoading = true;
    const reader = new FileReader();
    let image = null;
    const file = event.target.files[0];
    const i = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      i.getImageAsBase64.emit(reader.result)
      i.isLoading = false;

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      i.isLoading = false;
    };
  }
}
