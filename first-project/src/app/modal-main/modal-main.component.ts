import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-main',
  templateUrl: './modal-main.component.html',
  styleUrls: ['./modal-main.component.css']
})
export class ModalMainComponent implements OnInit {
  @Input('title') title = "";
  @Input('childTemplate') childTemplate!: TemplateRef<any>;
  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.modalService.open(this.content,
      {
        size: 'xl'
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
