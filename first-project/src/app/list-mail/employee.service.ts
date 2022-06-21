import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { count, skip, take, toArray } from "rxjs/operators";
import { EMPLOYEES } from "./employee.data";
import { Employee } from "./employee.template";

@Injectable()
export class EmployeesService {
  employees: Employee[];

  constructor() {
    this.employees = this.getEmployees();
  }

  getEmployees() {
    // should change to HTTPClient Request later
    return EMPLOYEES;
  }

  getEmployeesByPage(offset: number, size: number) {
    return of(this.employees.slice((offset - 1) * size, (offset - 1) * size + size));
  }

  search(text: string, offset: number, size: number) {
    this.employees = this.getEmployees();
    this.employees =  this.employees.filter(shift => {
      const term = text.toLowerCase();
      return shift.AccountMobiMap.toLowerCase().includes(term)
          || shift.Name.toLowerCase().includes(term)
          || shift.Email.toLowerCase().includes(term);
    });
    return this.getEmployeesByPage(offset, size);
  }

  getTotalEmployees() {
    return this.employees.length;
  }

}
