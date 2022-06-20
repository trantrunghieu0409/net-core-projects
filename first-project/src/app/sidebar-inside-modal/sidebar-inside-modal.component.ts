import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-inside-modal',
  templateUrl: './sidebar-inside-modal.component.html',
  styleUrls: ['./sidebar-inside-modal.component.css']
})
export class SidebarInsideModalComponent implements OnInit {
  @ViewChild('sidebar-inside') sidebar: any;
  @Input('title') title = "";
  @Input('insideSidebar') insideSidebar!: TemplateRef<any>;
  @Output('onViewData') onViewData = new EventEmitter();
  isPin = false;
  show = true;

  constructor() {
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.show = !this.show;
  }

  onMouseLeave() {
    if (!this.isPin) {
      this.show = false;
    }
  }
}
