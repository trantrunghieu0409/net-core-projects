import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = "Thống kê báo cáo"
  constructor() { }

  ngOnInit(): void {
  }

  openReport() {

  }
}
