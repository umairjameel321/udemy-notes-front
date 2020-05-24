import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AuthGuardService} from 'src/app/services/core/guards/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/features/loginregister/loginregister.module#LoginregisterModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: 'src/app/features/home/home.module#HomeModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
