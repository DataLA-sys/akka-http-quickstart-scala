package com.example.domain

case class Table(name: String, project: String = "", layer: String = "",
                 in: List[Table] = List(),
                 out: List[Table] = List(),
                 datasetType: String = "Table",
                 pathToData: Option[String] = None,
                 sourceFile: Option[String] = None,
                 sourceFileContent: Option[String] = None
                )