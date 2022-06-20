import { Component, OnInit, ViewChild } from '@angular/core';
import { MaintainanceShift } from '../list-maintain/shift.template';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-maintanance-shift',
  templateUrl: './detail-maintanance-shift.component.html',
  styleUrls: ['./detail-maintanance-shift.component.css']
})
export class DetailMaintananceShiftComponent implements OnInit {
  @ViewChild('container') container: any;
  shift!: MaintainanceShift;
  show = false;
  constructor() { }

  ngOnInit(): void {
  }

  viewDetail(shift: MaintainanceShift) : void {
    this.shift = shift;
    console.log(shift);
    this.show = true;
    try {
      this.container.open();
    }
    catch (e) {
      console.log(e);
      setTimeout(() => { this.container.open(); });
    }
  }
}
