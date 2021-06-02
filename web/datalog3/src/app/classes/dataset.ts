export class Dataset {
  name!: string;
  layer!: string;
  project?: string;
  in!: Dataset[];
  out!: Dataset[];
  datasetType?: string;
  pathToData?: string;
  sourceFile?: string;
}
