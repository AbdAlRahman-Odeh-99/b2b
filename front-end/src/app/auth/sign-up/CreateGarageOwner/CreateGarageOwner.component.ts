import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignUpInfoService } from '@app/core/services/sign-up/sign-up-info.service';
import { Router } from '@angular/router';
import { AuthRoutingConstants, AppRoutingConstants, SharedRoutingConstants } from '@app/core/constants/routes';

@Component({
  selector: 'app-CreateGarageOwner',
  templateUrl: './CreateGarageOwner.component.html',
  styleUrls: ['./CreateGarageOwner.component.scss']
})
export class CreateGarageOwnerComponent implements OnInit {
  storeInfo: FormGroup;

  constructor(
    private signUpInfoService: SignUpInfoService,
    private router: Router,
  ) {
    if (this.signUpInfoService.getUserInfoData().invalid) {
      this.router.navigateByUrl(`${AppRoutingConstants.AUTH}/${AuthRoutingConstants.SIGN_UP}/${SharedRoutingConstants.GARAGE}/${AuthRoutingConstants.USER_INFO}`)
      return;
    }
  }

  ngOnInit() {
    this.storeInfo = this.signUpInfoService.getGarageInfoData();
  }

  getImageAsBase64(value) {
    console.log(value.length)
    this.storeInfo.patchValue({ image: value });
  }
}
