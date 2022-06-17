import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MaintainanceShiftComponent } from '../maintainance-shift/maintainance-shift.component';
import { MaintainanceShift } from './shift.template';
import { SHIFTS } from './shift.data';

function search(text: string): MaintainanceShift[] {
  return SHIFTS.filter(shift => {
    const term = text.toLowerCase();
    return shift.Code.toLowerCase().includes(term)
        || shift.POPType.toLowerCase().includes(term)
        || shift.POP.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-list-maintain',
  templateUrl: './list-maintain.component.html',
  styleUrls: ['./list-maintain.component.css']
})
export class ListMaintainComponent implements OnInit {
  shifts$ = new Observable<MaintainanceShift[]>();
  filter = new FormControl('');
  collectionSize = SHIFTS.length;
  pageSize = 3;
  page = 1;

  constructor() {
    this.shifts$ = this.filter.valueChanges.pipe(
      startWith(""),
      map(text => search(text))
    )
  }

  ngOnInit(): void {
  }

  refreshShifts(): void {
    console.log(this.pageSize);
  }
}
