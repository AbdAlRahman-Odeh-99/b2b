
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthRoutingConstants } from '@app/core/constants/routes';

const routes: Routes =
    [
        {
            path: '',
            component: AuthComponent,
            children: [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: AuthRoutingConstants.LOGIN,
                },
                {
                    path: AuthRoutingConstants.LOGIN,
                    component: LoginComponent,
                },
                {
                    path: AuthRoutingConstants.RESET_PASSWORD,
                    component: ResetPasswordComponent,
                },
                {
                    path: `${AuthRoutingConstants.SIGN_UP}/:${AuthRoutingConstants.TYPE}`,
                    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
                },
            ]
        },
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }