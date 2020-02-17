import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SharedModule } from '../shared/shared.module';
import { PokedexInfoDialogComponent } from './detail-page/dialogs/pokedex-info-dialog.component';


@NgModule({
  declarations: [ListPageComponent, DetailPageComponent, PokedexInfoDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PokedexRoutingModule
  ],
  entryComponents: [PokedexInfoDialogComponent]
})
export class PokedexModule { }
