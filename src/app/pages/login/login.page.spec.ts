import { AppInitialState } from './../../../store/AppInitialState';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { hide } from 'src/store/loading/loading.actions';
import { AuthService } from 'src/app/services/auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
    store = TestBed.get<Store>(Store);

    // initialize ToastController beforeEach using TestBed
    toastController = TestBed.get(ToastController);

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should go to the home page when logging in', () => {
    spyOn(router, 'navigate');
    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('should go to the register page by "Register" button click', () => {
    spyOn(router, 'navigate');
    component.registerUser();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  })

  // Forgot email/password 
  it('should recover forgot email/password on forgot email/password', () => {
    // start the page
    fixture.detectChanges();

    //user inout valid email
    component.form.get('email')?.setValue('valid@email.com')

    //use clicked on forgot email/password button
    page.querySelector('#forgotEmailPassword')?.click();

    //expect loginState isRecoveringPassword is true
    store.select('login').subscribe((loginState) => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });
  })

  it('should show loading when recovering password', () => {
    //start page
    fixture.detectChanges();

    // change isRecoveringPassword to true
    store.dispatch(recoverPassword());
    // verify loading.show is true
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeTruthy();
    });
  })

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create')
    
    //start page
    fixture.detectChanges();
    // set login state as recovering password
    store.dispatch(recoverPassword());
    // set login state as recovered password
    store.dispatch(recoverPasswordSuccess())
    // verify loading.show is false
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    })

    // verify success message appeared
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController, 'create')
    
    //start page
    fixture.detectChanges();
    // set login state as recovering password
    store.dispatch(recoverPassword());
    // set login state as error on recover password
    store.dispatch(recoverPasswordFail({error: 'Email not found'}))
    // verify loading.show is false
    store.select('loading').subscribe((loadingState) => {
      expect(loadingState.show).toBeFalsy();
    })

    // verify error message appeared
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
