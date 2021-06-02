import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { TemplateFile } from '../classes/tempates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(private http: HttpClient) { }

  saveTemplate(template: TemplateFile): Observable<TemplateFile> {
    return this.http.post<TemplateFile>("/template", template)
  }

  renderTemplate(fileName: string) {
    const params = new HttpParams()
      .set('fileName', fileName)
    params.append("fileName", fileName)
    return this.http.get("/renderTemplate", { params })
  }
}
