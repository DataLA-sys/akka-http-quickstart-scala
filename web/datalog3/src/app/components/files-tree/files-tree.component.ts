import { Component, OnInit, Input } from '@angular/core';
import { ProjectFileDir } from 'src/app/classes/topology';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: ProjectFileDir
}

@Component({
  selector: 'files-tree',
  templateUrl: './files-tree.component.html',
  styleUrls: ['./files-tree.component.css']
})
export class FilesTreeComponent implements OnInit {

  @Input()
  filesTree?: ProjectFileDir[]

  private _transformer = (node: ProjectFileDir, level: number) => {
    return {
      expandable: !!node.childDirs && node.childDirs.length > 0,
      name: node.name,
      level: level,
      data: node
    };
  }  

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.childDirs); 

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() { 
    this.filesTree = []
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    if(this.filesTree) {
      this.dataSource.data = this.filesTree;
    } else {
      this.dataSource.data = []
    }
    
  }

}
