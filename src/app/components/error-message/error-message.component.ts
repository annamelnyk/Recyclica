import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() field: any;
  @Input() error: string = '';

  constructor() { }

  ngOnInit() { }

  shouldShowComponent(): boolean {
    if (this.field?.touched && this.field.errors?.[this.error]) {
      return true;
    }

    return false;
  }

}
