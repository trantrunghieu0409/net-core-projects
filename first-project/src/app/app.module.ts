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
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';
import { ConfirmboxComponent } from './confirmbox/confirmbox.component';
import { EditMaintainanceShiftComponent } from './edit-maintainance-shift/edit-maintainance-shift.component';
import { DetailMaintananceShiftComponent } from './detail-maintanance-shift/detail-maintanance-shift.component';
import { SmallerContainterComponent } from './smaller-containter/smaller-containter.component';
import { ParagraphInputComponent } from './paragraph-input/paragraph-input.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './report/report.component';
import { ModalMainComponent } from './modal-main/modal-main.component';
import { ContainerWithSidebarComponent } from './container-with-sidebar/container-with-sidebar.component';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ViewListMailComponent } from './view-list-mail/view-list-mail.component';

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
    DatepickerRangeComponent,
    ConfirmboxComponent,
    EditMaintainanceShiftComponent,
    DetailMaintananceShiftComponent,
    SmallerContainterComponent,
    ParagraphInputComponent,
    ReportComponent,
    ModalMainComponent,
    ContainerWithSidebarComponent,
    PieChartComponent,
    ViewListMailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
