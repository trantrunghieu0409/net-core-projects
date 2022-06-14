import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMaintainanceShiftComponent } from './create-maintainance-shift/create-maintainance-shift.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicComponent } from './public/public.component';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'map', component: HomepageComponent , children: [
    {
      path: 'create-maintainance-shift', component: CreateMaintainanceShiftComponent
    }
  ]},
  {
    path: 'public', component: PublicComponent, children: [
      {
        path: 'create-maintainance-shift', component: CreateMaintainanceShiftComponent
      }
    ]
  },
  // Other routes here
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
