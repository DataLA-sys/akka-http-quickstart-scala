package com.example.domain

object Layer extends Enumeration {
  val External, Raw, Internal, Datamart = Value
}

sealed trait DataLayer { 
    def name: String
    def order: Int 
  }

case class InputLayer(name: String = "Input", order: Int = 0) extends DataLayer
case class RawDataLayer(name: String = "Raw", order: Int = 1) extends DataLayer
case class InternalDataLayer(name: String = "Internal", order: Int = 2) extends DataLayer
case class FinalDataLayer(name: String = "Final", order: Int = 3) extends DataLayer
case class OutputLayer(name: String = "Output", order: Int = 4) extends DataLayer