import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintainanceShift } from '../list-maintain/shift.template';

@Component({
  selector: 'app-detail-maintanance-shift',
  templateUrl: './detail-maintanance-shift.component.html',
  styleUrls: ['./detail-maintanance-shift.component.css']
})
export class DetailMaintananceShiftComponent implements OnInit {
  @ViewChild('container') container: any;
  shift!: MaintainanceShift;
  constructor() { }

  ngOnInit(): void {
  }

  viewDetail(shift: MaintainanceShift) : void {
    this.shift = shift;
    this.container.open();
  }
}
