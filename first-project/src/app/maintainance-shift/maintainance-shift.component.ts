import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintainance-shift',
  templateUrl: './maintainance-shift.component.html',
  styleUrls: ['./maintainance-shift.component.css']
})
export class MaintainanceShiftComponent implements OnInit {
  LoaiBaoTri: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
