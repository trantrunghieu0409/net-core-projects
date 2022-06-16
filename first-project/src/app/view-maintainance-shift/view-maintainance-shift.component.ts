import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-maintainance-shift',
  templateUrl: './view-maintainance-shift.component.html',
  styleUrls: ['./view-maintainance-shift.component.css']
})
export class ViewMaintainanceShiftComponent implements OnInit {
  @ViewChild('content') content: any;
  idModal: string = "create-maintainance-shift";
  title: string = "Danh sách ca bảo trì";
  LoaiBaoTri: number = 0;
  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.content,
      {
        windowClass: 'view-maintainance-shift'

      }).result.then(
        (result) => {
          this.router.navigate(['/']);
        },
        (reason) => {
          // reload page after navigate to reset view
          this.router.navigate(['/']);
        }
      );
  }

}
