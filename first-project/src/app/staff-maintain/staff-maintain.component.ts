import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-maintain',
  templateUrl: './staff-maintain.component.html',
  styleUrls: ['./staff-maintain.component.css']
})
export class StaffMaintainComponent implements OnInit {
  @Input() inline= false;
  constructor() { }

  ngOnInit(): void {
  }

}
