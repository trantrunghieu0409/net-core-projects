import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {
  @Input() inline = false;
  constructor() { }

  ngOnInit(): void {
  }

}
