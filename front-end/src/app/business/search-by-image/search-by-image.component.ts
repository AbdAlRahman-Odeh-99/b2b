import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'search-by-image',
  templateUrl: './search-by-image.component.html',
  styleUrls: ['./search-by-image.component.css']
})
export class SearchByImageComponent implements OnInit {

  map: GoogleMap;
  constructor() { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'https://maps.googleapis.com/maps/api/js?key=9856d2b5d8fd26f9`)',
      API_KEY_FOR_BROWSER_DEBUG: 'http://maps.googleapis.com/maps/api/js?key=9856d2b5d8fd26f9`)'
    });

    const mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    const marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  ngOnInit(): void {
  }

}
