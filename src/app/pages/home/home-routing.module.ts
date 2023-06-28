import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
