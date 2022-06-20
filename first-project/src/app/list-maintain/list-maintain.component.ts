import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, count } from 'rxjs';
import { MaintainanceShift } from './shift.template';
import { SHIFTS } from './shift.data';
import { ShiftService } from './shift.service';

@Component({
  selector: 'app-list-maintain',
  templateUrl: './list-maintain.component.html',
  styleUrls: ['./list-maintain.component.css'],
  providers: [ShiftService]
})
export class ListMaintainComponent implements OnInit {
  shifts$ = new Observable<MaintainanceShift[]>();
  filter = new FormControl('');
  collectionSize = this.shiftService.getTotalShifts();
  pageSize = 3;
  page = 1;

  constructor(private shiftService: ShiftService) {
    this.refreshShifts();
    this.filter.valueChanges.subscribe(text => {
      this.shifts$ = this.shiftService.search(text, this.page, this.pageSize);
      this.collectionSize = this.shiftService.getTotalShifts();
    })
  }

  ngOnInit(): void {
  }

  refreshShifts(): void {
    this.shifts$ = this.shiftService.getShiftsByPage(this.page, this.pageSize);
    this.collectionSize = this.shiftService.getTotalShifts();

  }
}
