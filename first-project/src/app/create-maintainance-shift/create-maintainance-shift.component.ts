import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-maintainance-shift',
  templateUrl: './create-maintainance-shift.component.html',
  styleUrls: ['./create-maintainance-shift.component.css']
})
export class CreateMaintainanceShiftComponent implements OnInit{
  @ViewChild('content') content: any;
  idModal: string = "create-maintainance-shift";
  title: string = "Tạo list bảo trì";

  constructor() { }

  ngOnInit(): void {
  }
}
