import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeesService } from './employee.service';
import { Employee } from './employee.template';

@Component({
  selector: 'app-list-mail',
  templateUrl: './list-mail.component.html',
  styleUrls: ['./list-mail.component.css'],
  providers: [EmployeesService]
})
export class ListMailComponent implements OnInit {
  employees$ = new Observable<Employee[]>();
  filter = new FormControl('');
  collectionSize = this.employeesService.getTotalEmployees();
  pageSize = 5;
  page = 1;

  editing = false;

  constructor(private employeesService: EmployeesService) {
    this.refreshEmployees();
    this.filter.valueChanges.subscribe(text => {
      this.employees$ = this.employeesService.search(text, this.page, this.pageSize);
      this.collectionSize = this.employeesService.getTotalEmployees();
    })
  }

  ngOnInit(): void {
  }

  refreshEmployees(): void {
    this.employees$ = this.employeesService.getEmployeesByPage(this.page, this.pageSize);
    this.collectionSize = this.employeesService.getTotalEmployees();
  }
}
