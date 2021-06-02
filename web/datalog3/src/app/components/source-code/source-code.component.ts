import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.css']
})
export class SourceCodeComponent implements OnInit {

  @Input()
  codeValue: string = "";
  @ViewChild('editor') editor: any;

  constructor() { }

  ngOnInit(): void {
  }

}
