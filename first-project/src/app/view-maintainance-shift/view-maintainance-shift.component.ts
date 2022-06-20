import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-maintainance-shift',
  templateUrl: './view-maintainance-shift.component.html',
  styleUrls: ['./view-maintainance-shift.component.css']
})
export class ViewMaintainanceShiftComponent implements OnInit {
  @ViewChild('container') container: any;

  title: string = "Danh sách ca bảo trì";
  LoaiBaoTri: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  openContainer() {
    console.log(this.container)
    this.container.open();
  }
}
