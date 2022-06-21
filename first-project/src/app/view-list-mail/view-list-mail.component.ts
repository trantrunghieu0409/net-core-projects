import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-list-mail',
  templateUrl: './view-list-mail.component.html',
  styleUrls: ['./view-list-mail.component.css']
})
export class ViewListMailComponent implements OnInit {
  @ViewChild('container') container: any;
  title: string = "Danh sách nhận mail bảo trì";
  constructor() { }

  ngOnInit(): void {
  }
  openContainer() {
    this.container.open();
  }
}
