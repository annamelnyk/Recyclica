import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [PickupCallCardComponent],
  imports: [CommonModule,
    FormsModule,
    IonicModule,],
  exports: [PickupCallCardComponent]
})
export class ComponentsModule {}
