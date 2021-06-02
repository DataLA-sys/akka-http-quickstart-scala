package com.example.actors

import akka.actor.typed.scaladsl.AskPattern.{Askable, schedulerFromActorSystem}
import akka.actor.typed.{ActorRef, ActorSystem, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors

import scala.concurrent.ExecutionContext.Implicits.global
import akka.util.Timeout
import com.example.actors.JsonActor.{LoadJsonConfig, LoadedJsonConfig, ParseItCommand, ParseOwSqoopDir, ParseTopology, ParseTriggersDir, ParsedResultMessage, ParsedTopology}
import com.example.actors.RenderActor.{Rendered, RenderedMessage}
import com.example.domain.{ProjectFileDir, Table, Topology}
import org.json4s._
import org.json4s.jackson.Serialization

import java.io.File
import scala.collection.mutable.ListBuffer
import scala.concurrent.{Await, Future}
import scala.concurrent.duration.{Duration, DurationInt}
import scala.io.Source.fromFile
import scala.util.Success
import scala.collection.concurrent

object OwConfigToTopologyActor {
  trait Command
  case class RenderIt(replyTo: ActorRef[String]) extends Command
  case class RenderTemplate(template: String, replyTo: ActorRef[String]) extends Command
  case class ParseConfig(configType: String, pathToConfig: String, replyTo: ActorRef[String]) extends Command
  case class BuildTemplateJson(templateType: String, replyTo: ActorRef[String]) extends Command

  def apply(): Behavior[Command] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)

  def getListOfFiles(dir: String):List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).toList
    } else {
      List[File]()
    }
  }

  def getListOfDirs(dir: String):List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isDirectory).toList
    } else {
      List[File]()
    }
  }

  def loadProjectFile(project: String, file: String): ProjectFileDir = {
    import java.nio.file.Paths
    val p = Paths.get(file)
    val fileName = p.getFileName.toString
    try {
    val fileLines = fromFile(file).getLines
      ProjectFileDir(project, fileName, isFile = true, fileContent = fileLines.mkString("\r\n"))
    } catch {
      case _ => ProjectFileDir(project, fileName)
    }
  }

  def loadProjectDir(project: String, dir: String): List[ProjectFileDir] = {
    getListOfFiles(dir).map(f => loadProjectFile(project, f.getAbsolutePath))
  }

  def buildProjectDir(project: String, path: String): ProjectFileDir = {
    val dir = new File(path)
    if (dir.exists && dir.isDirectory) {
      val files = getListOfFiles(path).map(f => loadProjectFile(project, f.getAbsolutePath))
      val dirs = getListOfDirs(path).map(d => buildProjectDir(project, d.getAbsolutePath))
      ProjectFileDir(project, dir.getName, dirs ++ files)
    } else {
      ProjectFileDir(project, "", List())
    }
  }

  def render(): Behavior[Command] = {
    Behaviors.setup[Command] { context =>
      implicit val system: ActorSystem[_] = context.system
      implicit val timeout: Timeout = 33.seconds
      implicit val formats = DefaultFormats
      val jsonActor: ActorRef[ParseItCommand] = context.spawn(JsonActor(), "jsonActor")
      val renderActor: ActorRef[RenderActor.RenderCommand] = context.spawn(RenderActor(), "renderActor")
      Behaviors.receiveMessage[Command] {
          case  ParseConfig(configType, pathToConfig, replyTo) => {
            Await.ready(jsonActor.ask(LoadJsonConfig(pathToConfig, configType, _))
              .flatMap((m: ParsedResultMessage) => m match {
                  case LoadedJsonConfig(configData, configType, fileShortName: String, _) => {
                    renderActor.ask(RenderActor.RenderIt(configData, configType, fileShortName, _))
                      .flatMap((m2: RenderedMessage) => m2 match {
                        case Rendered(value: Topology, _, _) => {
                          replyTo ! Serialization.write(value)
                        }
                        Future()
                      })
                    }
                  Future()
                }
              ), Duration.Inf)
            Behaviors.same
          }
          case message: RenderIt => {
            implicit val timeout: Timeout = 33.seconds
            val datasets = ListBuffer[Topology]()

            def jsonLoaded(f: Future[ParsedResultMessage]): Unit = {
                val fm: Future[Unit] = f.map {
                  case LoadedJsonConfig(configData: JValue, configType: String, fileShortName: String, _) =>
                    topologyReady(renderActor.ask(RenderActor.RenderIt(configData, configType, fileShortName, _)))
                }
                Await.ready(fm, Duration.Inf)
            }
            def topologyReady(r: Future[RenderedMessage]): Unit = {
              val fm = r.map {
                case Rendered(value: Topology, configType, _) => datasets += value
              }
              Await.ready(fm, Duration.Inf)
            }

            List(
              ("C:\\projects\\temp\\alfabank\\Oliver_Wyman\\oozie_workflows\\reg\\wf_reg_ow_logs_deriveddata_daily\\config\\conf.json", "OW"),
              ("C:\\projects\\temp\\alfabank\\connectordata\\Connector_Data\\hdfs_home\\scripts\\Connector_Data\\conf.json", "Connector_data"),
              ("C:\\projects\\temp\\alfabank\\bki\\C5486671.Обогащение данных введённых в область dmin_risk\\oozie_workflows\\reg\\wf_reg_imbr_cre_req_deriveddata_daily\\conf\\conf.json", "BKI")
            ).foreach(c => jsonLoaded(jsonActor.ask(LoadJsonConfig(c._1, c._2, _))))

            val files = new ListBuffer[ProjectFileDir]

            files += buildProjectDir("Oliver_Wyman", "C:\\projects\\temp\\alfabank\\Oliver_Wyman") // loadProjectFile("Oliver_Wyman", "./src/main/resources/conf_ow.json")
            files += buildProjectDir("Connector_data", "C:\\projects\\temp\\alfabank\\connectordata")//loadProjectFile("Connector_data", "C:\\projects\\temp\\alfabank\\connectordata\\Connector_Data\\hdfs_home\\scripts\\Connector_Data\\conf.json")
            files += buildProjectDir("BKI", "C:\\projects\\temp\\alfabank\\bki\\C5486671.Обогащение данных введённых в область dmin_risk")//loadProjectFile("BKI", "C:\\projects\\temp\\alfabank\\bki\\C5486671.Обогащение данных введённых в область dmin_risk\\oozie_workflows\\reg\\wf_reg_imbr_cre_req_deriveddata_daily\\conf\\conf.json")
            //files ++= loadProjectDir("Oliver_Wyman", "C:\\projects\\temp\\alfabank\\Oliver_Wyman\\hdfs_home\\scripts\\Oliver_Wyman")

            val futures = new ListBuffer[Future[ParsedResultMessage]]
            futures += jsonActor.ask(ParseOwSqoopDir("C:\\projects\\temp\\alfabank\\Oliver_Wyman\\hdfs_home\\scripts\\Oliver_Wyman", _))
            futures += jsonActor.ask(ParseTriggersDir("C:\\projects\\temp\\alfabank\\Oliver_Wyman\\hdfs_home\\scripts\\Oliver_Wyman", _))

            futures.foreach(f => {
              f.map {
                case ParsedTopology(topology: Topology, _) =>  datasets += topology
              }
            })
            Await.ready(Future.sequence(futures), Duration.Inf)
            val newTopology = Topology(datasets = datasets.toList.flatten(t => t.datasets), projectFiles = files.toList)
            implicit val formats = DefaultFormats
            message.replyTo ! Serialization.write(newTopology)
            println("Success!!!")
            Behaviors.same
          }
      }
    }
  }
}
