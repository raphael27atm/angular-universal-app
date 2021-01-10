import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AuthGuardService } from './auth-guard.service';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
