import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmbox',
  templateUrl: './confirmbox.component.html',
  styleUrls: ['./confirmbox.component.css']
})
export class ConfirmboxComponent implements OnInit {
  @Input('childTemplate') childTemplate!: TemplateRef<any>;
  @Input('Mode') mode = 1; // 0: YES NO; 1 YES CANCEL; 2 YES NO CANCEL
  @Input('Yes') yes: string = "Đồng ý";
  @Input('No') no: string = "Không đồng ý";
  @Input('Cancel') cancel: string = "Hủy";
  @ViewChild('content') content: any;

  @Output('result') result: any;
  constructor(private modalService: NgbModal) {
    this.result = Result.CANCEL;
  }

  ngOnInit(): void {
  }

  toggle() : void {
    this.modalService.open(this.content, { size: 'sm' }).result.then((result) => {
      if (result === "YES") {
        this.result = Result.YES;
      }
      else if (result === "NO") {
        this.result = Result.NO;
      }
    }, (reason) => {
      this.result = Result.CANCEL;
    });;
  }
}

export enum Result {
  YES,
  NO,
  CANCEL
}
