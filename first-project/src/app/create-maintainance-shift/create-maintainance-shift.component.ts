import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-maintainance-shift',
  templateUrl: './create-maintainance-shift.component.html',
  styleUrls: ['./create-maintainance-shift.component.css']
})
export class CreateMaintainanceShiftComponent implements OnInit, AfterViewInit {
  @ViewChild('content') content: any;
  idModal: string = "create-maintainance-shift";
  title: string = "Tạo ca bảo trì";

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.content,
      {
        size: 'xl'
      }).result.then(
        (result) => {
          this.router.navigateByUrl('../map').then(() => {
            window.location.reload();
          });
        },
        (reason) => {
          // reload page after navigate to reset view
          this.router.navigateByUrl('../map').then(() => {
            window.location.reload();
          });
        }
      );
  }

}
