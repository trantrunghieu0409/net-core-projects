import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-maintainance-shift',
  templateUrl: './edit-maintainance-shift.component.html',
  styleUrls: ['./edit-maintainance-shift.component.css']
})
export class EditMaintainanceShiftComponent implements OnInit {
  @Input('title') title: string = 'Modal title';
  @ViewChild('content') content: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open() : void {
    this.modalService.open(this.content, {size: 'lg'});
  }
}
