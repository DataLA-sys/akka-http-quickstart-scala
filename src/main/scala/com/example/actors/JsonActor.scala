package com.example.actors
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors
import akka.util.Timeout
import com.example.actors.RenderActor.render
import org.json4s._
import org.json4s.jackson.JsonMethods._
import com.example.domain._

import java.io.File
import java.nio.file.Paths
import scala.collection.mutable.ListBuffer
import scala.concurrent.duration.DurationInt
import scala.io.Source._

object JsonActor {
  def apply(): Behavior[ParseItCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)

  implicit val formats = DefaultFormats
  sealed trait ParseItCommand
  case class ParseTopology(json: JValue, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  case class LoadJsonConfig(jsonFile: String, configType: String, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  case class ParseOwSqoopDir(pathToScripts: String, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  case class ParseBkiSqoopDir(pathToScripts: String, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  case class ParseTriggersDir(path: String, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  sealed trait ParsedResultMessage
  case class ParsedTopology(topology: Topology, from: ActorRef[ParseTopology]) extends ParsedResultMessage
  case class LoadedJsonConfig(configData: JValue, configType: String, fileShortName: String, from: ActorRef[ParseTopology]) extends ParsedResultMessage

  def deserializeJson(json: String): Topology = {
    val data = parse(json)
    data.extract[Topology]
  }

  def deserializeJson(json: JValue): Topology = {
    val data = json
    val r: Topology = data.extract[Topology]
    r
  }

  private def getListOfFiles(dir: String):List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).toList
    } else {
      List[File]()
    }
  }
  def parseTriggersDir(path: String): Topology = {
    val s =
      """
        {"datasets":[
          {"name": "alfacre.trig_subsribe", "project": "triggers", "layer": "Oracle"},
          {"name": "alfacre.trig", "project": "triggers", "layer": "Oracle"},
          {"name": "credreg_trig_alfacre_trig_subscribe", "project": "triggers", "layer": "Hive", "in": [{"name": "alfacre.trig_subsribe", "layer": "Oracle"}]},
          {"name": "credreg_trig_alfacre_triggers", "project": "triggers", "layer": "Hive", "in": [{"name": "alfacre.trig", "layer": "Oracle"}]},
          {"name": "credreg_trig_alfacre_trig_enriched", "project": "triggers", "layer": "Hive",
            "in": [
              {"name": "credreg_trig_alfacre_triggers", "layer": "Hive"},
              {"name": "credreg_trig_alfacre_trig_subscribe", "layer": "Hive"}
            ]},
          {"name": "credreg_trig_alfacre_trig_enriched_final", "project": "triggers", "layer": "DataMart",
            "in": [{"name": "credreg_trig_alfacre_trig_enriched", "layer": "Hive"}]}
        ]}
        """
    val data = parse(s)
    data.extract[Topology]
  }

  def parseSqoopOwDir(path: String): Topology = {
    var values: Map[String, (String, String)] = Map()
    getListOfFiles(path).filter(p => p.getName.startsWith("hive_") || p.getName.startsWith("sqoop_"))
      .foreach(f => {
      val filesKey = f.getName.split('.')(0)
        .replace("hive_", "")
        .replace("sqoop_", "")
      if(!values.keySet.exists(v => v == filesKey)) {
        values += (filesKey -> ("", ""))
      }
      f.getName() match {
        case fileName if fileName.startsWith("hive") => {
          val source = scala.io.Source.fromFile(f.getPath())
          try {
            val hiveTableName =  source.getLines()
              .find(s => s.startsWith("INSERT OVERWRITE TABLE ${DATABASE}."))
              .get.replace("INSERT OVERWRITE TABLE ${DATABASE}.", "")
            val mapping = values.get(filesKey)
            values += (filesKey -> (mapping.get._1, hiveTableName.toLowerCase))
          } finally
            source.close()
        }
        case fileName if fileName.startsWith("sqoop") => {
          val source = scala.io.Source.fromFile(f.getPath())
          try {
            val lines = source.getLines()
            val words = lines.find(s => s.trim.startsWith("sqoop import")).get.split(' ')
            var whereIndex = words.indexWhere(s => s.toUpperCase() == "WHERE")
            var tableIndex = -1
            if(whereIndex == -1) {
              whereIndex = words.indexWhere(s => s.toUpperCase() == "--TABLE")
              tableIndex = whereIndex + 1
            } else {
              tableIndex = whereIndex - 2
            }
            val sqoopSourceTable = words(tableIndex)
            val mapping = values.get(filesKey)
            values += (filesKey -> (sqoopSourceTable.toLowerCase, mapping.get._2))
          }
          finally
            source.close()
        }
        case _ => println("unknown string")
      }
    })

    val datasets = new ListBuffer[Table]
    values.foreach(v => {
      val table = v._2._2
      val inTable = v._2._1
      var project = "Oliver_Wyman_Dictionary"
      var inproject = "Oliver_Wyman_Dictionary"
      if(table.toLowerCase().contains("processing") || table.toLowerCase().contains("request") || table.toLowerCase().contains("errors")) {
        project = "Oliver_Wyman"
        inproject = "Oliver_Wyman"
      }
      //if(inTable.toLowerCase().contains("processing") || inTable.toLowerCase().contains("request") || inTable.toLowerCase().contains("errors")) {
        //var project = "Oliver_Wyman"
        //inproject = "Oliver_Wyman"
      //}
      //if(table.toLowerCase().contains("processing") || table.toLowerCase().contains("request") || table.toLowerCase().contains("errors")) {
        datasets += Table(name = table, layer = "Hive", project = project, in = List(Table(name = inTable, layer = "Oracle", project = inproject)))
      //}
    })
    Topology(datasets = datasets.toList)
  }

  def loadJsonFile(path: String): JValue = {
    val jsonString = fromFile(path).getLines.mkString
    parse(jsonString)
  }

  val render: Behavior[ParseItCommand] = Behaviors.receive { (context, message) => {
      implicit val timeout: Timeout = 33.seconds
      message match {
        case ParseTopology(json: JValue, replyTo) => {
          replyTo ! ParsedTopology(deserializeJson(json), context.self)
          Behaviors.same
        }
        case LoadJsonConfig(jsonFile, configType, replyTo) => {
          replyTo ! LoadedJsonConfig(loadJsonFile(jsonFile), configType, Paths.get(jsonFile).getFileName.toString, context.self)
          Behaviors.same
        }
        case ParseOwSqoopDir(pathToScripts, replyTo) => {
          replyTo ! ParsedTopology(parseSqoopOwDir(pathToScripts), context.self)
          Behaviors.same
        }
        case ParseTriggersDir(path, replyTo) => {
          replyTo ! ParsedTopology(parseTriggersDir(path), context.self)
          Behaviors.same
        }
      }
    }
  }
}
