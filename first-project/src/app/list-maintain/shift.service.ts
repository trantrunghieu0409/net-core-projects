import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { SHIFTS } from "./shift.data";
import { MaintainanceShift } from "./shift.template"
import { count, skip, take, toArray } from "rxjs/operators";

@Injectable()
export class ShiftService {
  shifts: MaintainanceShift[];

  constructor() {
    this.shifts = this.getShifts();
  }

  getShifts() {
    // should change to HTTPClient Request later
    return SHIFTS;
  }

  getShiftsByPage(offset: number, size: number) {
    return of(this.shifts.slice((offset - 1) * size, (offset - 1) * size + size));
  }

  search(text: string, offset: number, size: number) {
    this.shifts = this.getShifts();
    this.shifts =  this.shifts.filter(shift => {
      const term = text.toLowerCase();
      return shift.Code.toLowerCase().includes(term)
          || shift.POPType.toLowerCase().includes(term)
          || shift.POP.toLowerCase().includes(term);
    });
    return this.getShiftsByPage(offset, size);
  }

  getTotalShifts() {
    return this.shifts.length;
  }

}
