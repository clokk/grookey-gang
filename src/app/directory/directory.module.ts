import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryRoutingModule } from './directory-routing.module';
import { SearchComponent } from './search/search.component';
import { QueryComponent } from './query/query.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SearchComponent, QueryComponent],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    SharedModule
  ]
})
export class DirectoryModule { }
