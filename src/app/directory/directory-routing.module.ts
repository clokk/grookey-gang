import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { QueryComponent } from './query/query.component';


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: ':id', component: QueryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryRoutingModule { }