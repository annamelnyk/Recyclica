import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginState } from 'src/store/login/LoginState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.isRecoveringPassword(loginState);
      this.isRecoveredPassword(loginState);
      this.onIsRecoveredPasswordFail(loginState);
    })
  }

  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private isRecoveringPassword(loginState: LoginState): void {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());
      this.authService.recoverEmailPassword(this.form.get('email')?.value)
        .subscribe(
          () => this.store.dispatch(recoverPasswordSuccess()),
          (error) => this.store.dispatch(recoverPasswordFail({ error }))
        )
    }
  }

  private async isRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        color: 'success'
      });
      toaster?.present();
    }
  }

  private async onIsRecoveredPasswordFail(loginState: LoginState) {
    if (loginState.error) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster?.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.router.navigate(['home']);
  }

  registerUser() {
    this.router.navigate(['register']);
  }

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }
}
