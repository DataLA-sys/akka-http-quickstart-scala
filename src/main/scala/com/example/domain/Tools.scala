package com.example.domain

sealed trait Tool { def name: String }
sealed trait ToolAction { 
  def name: String
  def  executor: Tool
  def datasets: List[Table]
  } 

case class ExecutionTool(name: String) extends Tool
case class Action(name: String, executor: Tool, datasets: List[Table]) extends ToolAction