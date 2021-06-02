package com.example.domain

case class ProjectFileDir(project: String, name: String,
                          childDirs: List[ProjectFileDir] = List(), isFile: Boolean = false, fileContent: String = "")
case class Topology(tools: List[Tool] = List(), actions: List[ToolAction] = List(), datasets: List[Table] = List(),
                    projectFiles: List[ProjectFileDir] = List())