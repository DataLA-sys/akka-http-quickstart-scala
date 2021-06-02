import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TopologyService } from "../../services/topology.service";
import { ProjectFileDir, Topology } from "../../classes/topology";
import { Dataset } from '../../classes/dataset';
import { Subject } from 'rxjs';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { Svg2pdfOptions } from 'svg2pdf.js';

//var saveSvgAsPng = import("save-svg-as-png")

interface KeyValuePair {
  key: string;
  value: string;
}

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent implements OnInit {

  @ViewChild('editor') editor: any;
  text: string = "<test><order>PO001</order>\r\n<messgeID>1124</messageID></test>";
  
  setEditorContent(event: any) {
    // console.log(event, typeof event);
    console.log("");
  }

  saveGraph() {
    const doc = new jsPDF()

    const svgatt = document.getElementsByTagName("svg")
    const o: Svg2pdfOptions = {x: 0, y: 0, width: 1500, height: 2500, loadExternalStyleSheets: true}

    const element = svgatt[0]
    if(element) {
      const x = 0
      const y = 0
      const width = 1500
      const height = 2500
      doc
      .svg(element, o)
      .then(() => {
        doc.save('myPDF.pdf')
      })
    }

  }

  topology!: Topology;
  clusters: any[] = []
  nodes: any[] = []
  links: any[] = []
  projects: string[] = []
  selectedProject: string = ""
  error: any;
  selected: any = null
  data: any
  codeValue: any = "<a>aa</a>"

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }

  zoomToFit$: Subject<boolean> = new Subject();
  
  constructor(private topologyService: TopologyService, public cd: ChangeDetectorRef) { 

  }  

  showSourceCode() {
    alert('showSourceCode')
  }

  zoomToFit() {
    this.zoomToFit$.next(true)
  }  

  checkCluster(layer: string, nodeName: string, clusters: any[], tablesId: KeyValuePair[]) {
    let cluster: any = clusters.find((c: any) => c.label == layer)
    if(!cluster) {
      cluster = {id: layer, label: layer, childNodeIds: []}
      if(cluster.label == "Hive"){
        cluster.data = {image: "assets/Apache_Hive_logo.svg"}
      }
      if(cluster.label == "Oracle"){
        cluster.data = {image: "assets/oracle-2.svg"}
      }      
      if(cluster.label == "DataMart"){
        cluster.data = {image: "assets/datamart.png"}
      }      
      clusters.push(cluster)
    }
    cluster.childNodeIds.push(tablesId.find(k => k.key == nodeName)?.value)
  }
  
  findFileContent(dirs: ProjectFileDir[] | undefined, project: string | undefined, fileName: string | undefined): ProjectFileDir | undefined {
    let found: ProjectFileDir | undefined = undefined
    if(dirs) {
      found = dirs.find(d => d.project == project && d.isFile == true && d.name == fileName)
      if(!found) {
        for(let d of dirs) {
          found = this.findFileContent(d.childDirs, project, fileName)
          if(found) {
            break
          }        
        }
      }    
    }
    return found
  }

  nodeClick(node: any) {
    this.selected = node
    let dataset: Dataset = node.data.dataset
    let f: ProjectFileDir | undefined = this.findFileContent(this.topology.projectFiles, dataset?.project, dataset?.sourceFile)
    if(f) {
      this.codeValue = f.fileContent
    } else {
      this.codeValue = ""
    }
    this.cd.detectChanges()
  }

  checkIfSelected(node: any) {
    return node == this.selected
  }

  getData(data: Topology, project: any = null) {
    this.data = data
    console.log(data);
    
    let inodes: Dataset[] = []
    inodes = inodes.concat(data.datasets)
    data.datasets.forEach(dd => {
      dd.in.concat(dd.out).forEach(i => {
        if(inodes.filter(n => n.name == i.name).length == 0) {
          inodes.push(i);
        }
      })
    })
    let p: string[] = inodes.map(n=>n.project ? n.project : "Empty")
    this.projects = [...new Set(p)];
    this.selectedProject = this.projects.length > 0 ? this.projects[0] : ""

    let did: number = 0
    let tablesId: KeyValuePair[] = inodes.map(d =>  {return { key: d.name, value: "" + ++did }} )
    
    let linkid: number = 0
    let links: any[] = []
    let clusters: any[] = []
    data.datasets.forEach(d => {
      if(project == null || project == d.project) {
        this.checkCluster(d.layer, d.name, clusters, tablesId)
      }
      
      let inlinks = d.in.map(l => { 
        if(project == null || project == l.project) {
          this.checkCluster(l.layer, l.name, clusters, tablesId);
        }
        return {"id": ""+ ++linkid,"source": tablesId.find(k => k.key == l.name)?.value, "target": tablesId.find(k => k.key == d.name)?.value}
      });
      links = links.concat(inlinks);
      let outlinks = d.out.map(l => { 
        if(project == null || project == l.project) {
          this.checkCluster(l.layer, l.name, clusters, tablesId);
        }
        return {"id": ""+ ++linkid, "source": tablesId.find(k => k.key == d.name)?.value, "target": tablesId.find(k => k.key == l.name)?.value}
      });
      links = links.concat(outlinks);      
    })

    this.nodes = inodes.filter(d => project == null || d.project == project).map(d => {return {
      "id": tablesId.find(k => k.key == d.name)?.value, 
      "label": d.name, 
      "data": {"image": "assets/dataset.ico", "color": "#a95963", "dataset": d}}})
    this.links = links.filter(l => this.nodes.filter(n => n.id == l.source || n.id == l.target).length > 0)
    this.clusters = clusters;
    this.topology = data;
  }

  onWriterChange($event: any){
    this.getData(this.data, $event.value)
  }

  ngOnInit(): void {
    this.topologyService.getTopology().subscribe(
      data => this.getData(data),
      error => (this.error = error));
  }

}
