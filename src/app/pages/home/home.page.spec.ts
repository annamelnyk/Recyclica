import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router } from '@angular/router';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [HomePage],
    imports: [IonicModule.forRoot(), AppRoutingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to "pickup-calls" by click on "See all"', () => {
    spyOn(router, 'navigate');

    component.seeAll();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls']);
  })

  it('should go to new "pickup-call" by click on add button', () => {
    spyOn(router, 'navigate');

    component.addNew();

    expect(router.navigate).toHaveBeenCalledWith(['pickup-call']);
  })
});
