import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopologyComponent } from './components/topology/topology.component';
import { TopologyService } from './services/topology.service';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

import { ScrollingModule } from '@angular/cdk/scrolling';

import { FilesTreeComponent } from './components/files-tree/files-tree.component';
import { SourceCodeComponent } from './components/source-code/source-code.component';
import { TepmlateEditorComponent } from './components/tepmlate-editor/tepmlate-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TopologyComponent,
    FilesTreeComponent,
    SourceCodeComponent,
    TepmlateEditorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],  
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTreeModule,
    MatGridListModule,
    MatInputModule,
    ScrollingModule,
    AceEditorModule
  ],
  providers: [TopologyService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
