package com.example.actors

import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors
import com.example.domain.Topology
import org.fusesource.scalate.TemplateEngine
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization

object RenderActor {
  def apply(): Behavior[RenderCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)
  trait RenderCommand
  case class RenderIt(value: JValue, configType: String, sourceFile: String, replyTo: ActorRef[RenderedMessage]) extends RenderCommand
  case class RenderTemplate(template: String, replyTo: ActorRef[RenderedMessage]) extends RenderCommand
  trait RenderedMessage
  case class Rendered(value: Topology, configType: String, from: ActorRef[RenderCommand]) extends RenderedMessage
  case class RenderedTemplate(value: String, from: ActorRef[RenderCommand]) extends RenderedMessage

  object RenderIt {
    def project(configType: String): String = configType match { case "OW" => "Oliver_Wyman" case _ => configType }
    def template(configType: String): String = configType match { case "OW" | "Connector_data" => owTemplate case "BKI" => bkiTemplate }
  }

  val owTemplate = new java.io.File("./src/main/resources/simple_example_json.ssp").getCanonicalPath
  val bkiTemplate = new java.io.File("./src/main/resources/bki2topology.ssp").getCanonicalPath
  val engine = new TemplateEngine
  implicit val formats = DefaultFormats

  def renderWithJson(owConfigJson: JValue, configType: String, sourceFile: String): Topology = {
    val template = RenderIt.template(configType)
    val s: String = engine.layout(template, Map("data" -> owConfigJson, "project" -> RenderIt.project(configType), "sourceFile" -> sourceFile))
    val data = parse(s)
    data.extract[Topology]
  }

  def justRender(template: String): Topology = {
    val s: String = engine.layout(template)
    val data = parse(s)
    data.extract[Topology]
  }

  val render: Behavior[RenderCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: RenderIt => {
        message.replyTo ! Rendered(renderWithJson(message.value, message.configType, message.sourceFile), message.configType, context.self)
        Behaviors.same
      }
      case message: RenderTemplate => {
        var s: String = ""
        try {
          val topology = justRender(message.template)
          s = Serialization.write(topology)
        } catch {
          case e: Throwable => {
            s = e.getMessage + "\r\n"
            s = s + e.getStackTrace().map(f => f.toString + "\r\n").mkString
          }
        }
        message.replyTo ! RenderedTemplate(s, context.self)
        Behaviors.same
      }
    }
  }
}
