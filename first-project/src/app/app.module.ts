import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateMaintainanceShiftComponent } from './create-maintainance-shift/create-maintainance-shift.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HoverClassDirective } from './hover-class.directive';
import { ViewMaintainanceShiftComponent } from './view-maintainance-shift/view-maintainance-shift.component';
import { PublicComponent } from './public/public.component';
import { LocationComponent } from './location/location.component';
import { PopComponent } from './pop/pop.component';
import { MaintainanceShiftComponent } from './maintainance-shift/maintainance-shift.component';
import { StaffMaintainComponent } from './staff-maintain/staff-maintain.component';
import { ListMaintainComponent } from './list-maintain/list-maintain.component';
import { SidebarInsideModalComponent } from './sidebar-inside-modal/sidebar-inside-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PageNotFoundComponent,
    CreateMaintainanceShiftComponent,
    HomepageComponent,
    HoverClassDirective,
    ViewMaintainanceShiftComponent,
    PublicComponent,
    LocationComponent,
    PopComponent,
    MaintainanceShiftComponent,
    StaffMaintainComponent,
    ListMaintainComponent,
    SidebarInsideModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
