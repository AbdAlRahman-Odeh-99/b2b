import { TranslateService } from '@ngx-translate/core';
import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-Show-Hide-Password',
  templateUrl: './Show-Hide-Password.component.html',
  styleUrls: ['./Show-Hide-Password.component.css']
})
export class ShowHidePasswordComponent implements OnInit {
  showPassword = false;
  right = true;

  @ContentChild(IonInput) input: IonInput;

  constructor(private translate: TranslateService) { 

    if(translate.currentLang == 'ar') {
      this.right = false;
    } 
    else {
      this.right = true;
    }

  }

  ngOnInit() {
  }

  toggleShow(){
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

}
