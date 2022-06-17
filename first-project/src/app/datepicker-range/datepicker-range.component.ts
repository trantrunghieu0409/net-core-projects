import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-datepicker-range, [DatepickerRange]",
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css'],
  exportAs: 'DatepickerRange'
})

export class DatepickerRangeComponent {
  @Input('placeholder') placeholder = "yyyy-mm-dd";
  @Input('positionTarget') positionTarget: any;

  @ViewChild('datepicker') dp: any;
  hoveredDate: NgbDate | null = null;
  value = "";

  fromDate: NgbDate;
  toDate: NgbDate | null = null;


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.value = "Từ ngày " + this.formatter.format(this.fromDate) + " tới ngày " + this.formatter.format(this.toDate);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.value = "Từ ngày " + this.formatter.format(this.fromDate) + " tới ngày " + this.formatter.format(this.toDate);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.value = this.formatter.format(this.fromDate);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  toggle() {
    this.dp.toggle();
  }

}
