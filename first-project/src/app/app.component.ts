import { HttpClient } from '@angular/common/http';
import { Attribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }

  title = 'first-project';

  months = ["JAN", "FEB", "MAR", "APR"];

  isTrue = null;

  clickCount = 0;
  clickMe() {
    this.clickCount += 1;
  }

  value=""
  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  handleInput1(element: HTMLInputElement) {
    this.value = element.value;
  }
}
