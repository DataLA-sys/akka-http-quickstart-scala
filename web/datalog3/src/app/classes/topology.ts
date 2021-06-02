import { Dataset } from "./dataset"

export class ProjectFileDir {
  project: string = ""
  name: string = ""
  childDirs?: ProjectFileDir[]
  isFile: boolean = false
  fileContent: string = ""
}

export class Topology {
  tools!: any[]
  actions!: any[]
  datasets!: Dataset[]
  projectFiles?: ProjectFileDir[]
}
