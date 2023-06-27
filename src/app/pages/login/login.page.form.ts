import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {
  private formBuilder: FormBuilder;
  public form!: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
}