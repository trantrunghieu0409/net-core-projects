import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar-inside-modal',
  templateUrl: './sidebar-inside-modal.component.html',
  styleUrls: ['./sidebar-inside-modal.component.css']
})
export class SidebarInsideModalComponent implements OnInit {
  @ViewChild('sidebar-inside') sidebar: any;
  isPin = false;
  showSearchView = false;
  title="Xem danh sách bảo trì"
  constructor(private offcanvasService: NgbOffcanvas) {

  }

  open() {
    this.showSearchView = true;
  }

  close() {
    this.showSearchView = false;
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.showSearchView = !this.showSearchView;
  }

  onMouseLeave() {
    if (!this.isPin) {
      this.showSearchView = false;
    }
  }
}
