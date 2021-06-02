package com.example.domain

object StorageType extends Enumeration {
  val Source, Target, DataLike = Value
}

sealed trait Storage {
  def name: String
  def storageType: StorageType.Value 
}

case class DataStorage(name: String, storageType: StorageType.Value) extends Storage