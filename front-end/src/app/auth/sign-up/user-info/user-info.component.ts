import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpInfoService } from '@app/core/services/sign-up/sign-up-info.service';
import { Router } from '@angular/router';
import { AuthRoutingConstants, AppRoutingConstants, SharedRoutingConstants } from '@app/core/constants/routes';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  userInfo: FormGroup;

  constructor(private signUpInfoService: SignUpInfoService, private router: Router, private translate: TranslateService) {
    this.userInfo = this.signUpInfoService.getUserInfoData();
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes(AuthRoutingConstants.CAR_INFO)) {
       this.userInfo.patchValue({role: 'carOwner'});
      } else if (url.includes(AuthRoutingConstants.GARAGE_INFO)) {
        this.userInfo.patchValue({role: 'garageOwner'});
      }
    });
  }

  ngOnInit(): void {
  }
}
