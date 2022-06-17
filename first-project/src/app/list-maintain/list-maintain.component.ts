import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MaintainanceShiftComponent } from '../maintainance-shift/maintainance-shift.component';

interface MaintainanceShift {
  ID: number
  Code: string
  POPType: string
  POP: string
  Staff: string[]
  MaintainDate: number
  RealDate: number
  MaintainType: string
  Status: string
  Control: string
  NOTOK: number
}

const SHIFTS: MaintainanceShift[] = [
  {
    ID: 1,
    Code: "HCMV202-19012022-DK-01",
    POPType: "HCMV202",
    POP: "MPOP",
    Staff: [
      "tester.ktv",
      "tester.ktv1",
      "tester.adminntcap"
    ],
    MaintainDate: parseDate("2022-01-19"),
    RealDate: parseDate("2022-01-19"),
    MaintainType: 'Định kỳ',
    Status: "Quá hạn",
    Control: "Chưa xác nhận",
    NOTOK: 0
  },
  {
    ID: 2,
    Code: "HCMV202-19012022-DK-02",
    POPType: "HCMV202",
    POP: "MPOP",
    Staff: [
      "tester.ktv",
      "tester.ktv1",
      "tester.adminntcap"
    ],
    MaintainDate: parseDate("2022-01-19"),
    RealDate: parseDate("2022-05-19"),
    MaintainType: 'Định kỳ',
    Status: "Đã hoàn tất",
    Control: "Đã xác nhận lại 2",
    NOTOK: 4
  }
]

function parseDate(input: string) {

  let parts = input.split('-');

  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(Number(parts[0]), Number(parts[1]), Number(parts[2])).getTime(); // Note: months are 0-based
}

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
