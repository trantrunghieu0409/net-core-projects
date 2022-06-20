import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-container-with-sidebar',
  templateUrl: './container-with-sidebar.component.html',
  styleUrls: ['./container-with-sidebar.component.css']
})
export class ContainerWithSidebarComponent implements OnInit {
  @Input('titleSidebar') titleSidebar = ""
  @Input('templateInsideModal') insideSidebar!: TemplateRef<any>;
  @Input('templateOutsideModal') outsideSidebar!: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
  }

}
