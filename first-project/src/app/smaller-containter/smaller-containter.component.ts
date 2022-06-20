import { Component, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-smaller-containter',
  templateUrl: './smaller-containter.component.html',
  styleUrls: ['./smaller-containter.component.css']
})
export class SmallerContainterComponent implements OnInit {
  @Input('title') title: string = 'Container Title';
  @Input('childTemplate') childTemplate!: TemplateRef<any>;
  @Input('show') show = false;

  @Output('onClose') onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
    this.onClose.emit();
  }
}
