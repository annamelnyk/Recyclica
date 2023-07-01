import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { loadingReducer } from 'src/store/loading/loading.reducers';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    component.ngOnInit();

    //expect(component.form).not.toBeUndefined();
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
});
