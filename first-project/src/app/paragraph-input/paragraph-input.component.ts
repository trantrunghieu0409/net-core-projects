import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paragraph-input',
  templateUrl: './paragraph-input.component.html',
  styleUrls: ['./paragraph-input.component.css']
})
export class ParagraphInputComponent implements OnInit {
  @Input('title') title: string = 'Pragraph input';
  constructor() { }

  ngOnInit(): void {
  }

  config = {
    placeholder: '',
    tabsize: 2,
    height: 300,
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
}
