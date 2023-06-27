import { FormBuilder, FormGroup } from "@angular/forms";

import { LoginPageForm } from "./login.page.form";

describe('Login page form', () => {
  let loginPageForm: LoginPageForm;
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder());
    form = loginPageForm.createForm();

  })
  it('should create empty login form', () => {
    expect(form).not.toBeNull();

    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual('');
    expect(form.get('email')?.valid).toBeFalsy();

    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual('');
    expect(form.get('password')?.valid).toBeFalsy();
  })

  it('should be invalid email field if email is invalid', () => {
    form.get('email')?.setValue('invalid email');
    
    expect(form.get('email')?.valid).toBeFalsy();
  })

  it('should be valid email field if email is valid', () => {
    form.get('email')?.setValue('email@valid.com');
    
    expect(form.get('email')?.valid).toBeTruthy();
  })

  it('should be valid form if fields are valid and setted', () => {
    form.get('email')?.setValue('email@valid.com');
    form.get('password')?.setValue('password');
    
    expect(form.valid).toBeTruthy();
  })
})