import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyStoresService {

  constructor(private http: HttpClient) { }
  
}
