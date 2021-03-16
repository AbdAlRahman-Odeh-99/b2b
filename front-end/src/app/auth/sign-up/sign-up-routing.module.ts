import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCarOwnerComponent } from './CreateCarOwner/CreateCarOwner.component';
import { CreateGarageOwnerComponent } from './CreateGarageOwner/CreateGarageOwner.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SignUpComponent } from './sign-up.component';
import { AuthRoutingConstants } from '@app/core/constants/routes';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AuthRoutingConstants.USER_INFO,
      },
      {
        path: AuthRoutingConstants.USER_INFO,
        component: UserInfoComponent,
      },
      {
        path: AuthRoutingConstants.GARAGE_INFO,
        component: CreateGarageOwnerComponent,
      },
      {
        path: AuthRoutingConstants.CAR_INFO,
        component: CreateCarOwnerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
