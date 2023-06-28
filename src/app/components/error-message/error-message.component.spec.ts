import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message if field is touched and not filled', () => {
    component.field = new FormGroup({ anyField: new FormControl() });
    component.field.markAsTouched();
    component.field.setErrors({ anyError: true });
    component.error = 'anyError';

    expect(component.shouldShowComponent()).toBeTruthy();
  })

  it('should hide error message if field has not be touched', () => {
    component.field = new FormGroup({ anyField: new FormControl() });
    component.field.setErrors({ anyError: true });
    component.error = 'anyError';
     
    expect(component.shouldShowComponent()).toBeFalsy();
  })

  it('should hide error message if field has been touched and no error occured yet', () => {
    component.field = new FormGroup({ anyField: new FormControl() });
    component.field.markAsTouched();
     
    expect(component.shouldShowComponent()).toBeFalsy();
  })

  it('should hide error message if field has been touched and another error occured', () => {
    component.field = new FormGroup({ anyField: new FormControl() });
    component.field.setErrors({ anyError: true });
    component.error = 'anotherError';
    
     
    expect(component.shouldShowComponent()).toBeFalsy();
  })
});
