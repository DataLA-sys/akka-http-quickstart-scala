import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TemplateFile } from 'src/app/classes/tempates';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'tepmlate-editor',
  templateUrl: './tepmlate-editor.component.html',
  styleUrls: ['./tepmlate-editor.component.css']
})
export class TepmlateEditorComponent implements OnInit {
  fileName: string = "";
  fileContent: any;
  @ViewChild('templateEditor') editor: any;
  @Output() topologyParsedEvent = new EventEmitter<any>();

  constructor(private teplateService: TemplateService) { }

  ngOnInit(): void {
  }

  save() {
    let t = new TemplateFile()    
    if(this.fileName && this.fileContent) {
      t.fileName = this.fileName
      t.templateContent = this.fileContent
      this.teplateService.saveTemplate(t).subscribe(s => console.log(s))
    }    
  }

  setData() {
    this.topologyParsedEvent.emit(JSON.parse(this.fileContent));
  }

  renderTemplate() {
    this.teplateService.renderTemplate(this.fileName)
      .subscribe(s => {
        this.fileContent = JSON.stringify(s, null, 4)
        this.topologyParsedEvent.emit(s);
        console.log(s)
      }, error => {        
        console.log(error)
        this.fileContent = error.error.text;
      })
  }

}
