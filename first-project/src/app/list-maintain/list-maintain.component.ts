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
    MaintainDate: Date.parse("19/01/2022"),
    RealDate: Date.parse("19/01/2022"),
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
    MaintainDate: Date.parse("01/19/2022"),
    RealDate: Date.parse("01/19/2022"),
    MaintainType: 'Định kỳ',
    Status: "Đã hoàn tất",
    Control: "Đã xác nhận lại 2",
    NOTOK: 4
  }
]

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

  constructor() {
    this.shifts$ = this.filter.valueChanges.pipe(
      startWith(""),
      map(text => search(text))
    )
  }

  ngOnInit(): void {
  }


}
