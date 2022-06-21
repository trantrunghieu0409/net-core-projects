import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  title = "Thống kê báo cáo"
  public showChart = false;

  constructor() { }

  ngOnInit(): void {
  }

  openReport() {
    this.showChart = true;
  }
}
