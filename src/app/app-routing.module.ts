import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pokedex/pokedex.module').then(m => m.PokedexModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'directory',
    loadChildren: () =>
      import('./directory/directory.module').then(m => m.DirectoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
