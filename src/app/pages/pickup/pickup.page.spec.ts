import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupPage } from './pickup.page';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';

describe('PickupPage', () => {
  let component: PickupPage;
  let fixture: ComponentFixture<PickupPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PickupPage],
    imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(PickupPage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on "pickup-call" by click on "Create pickup-call" button', () => {
    spyOn(router, 'navigate');

    component.newPickUp();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })
});
