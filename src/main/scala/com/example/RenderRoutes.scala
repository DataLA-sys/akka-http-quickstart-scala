package com.example

import akka.actor.typed.{ActorRef, ActorSystem}
import com.example.actors._
import akka.actor.typed.scaladsl.AskPattern._
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.StatusCodes.PermanentRedirect
import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.model.headers.{`Access-Control-Allow-Credentials`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Origin`}
import akka.http.scaladsl.server.Directives.{complete, onSuccess, _}
import akka.http.scaladsl.server.{Directive0, Route}
import akka.util.Timeout
import com.example.actors.RenderActor.RenderTemplate
import com.example.engine.TemplateFile
import org.json4s.DefaultFormats
import org.json4s.jackson.Serialization

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import spray.json.DefaultJsonProtocol._

trait CORSHandler{

  private val corsResponseHeaders = List(
    `Access-Control-Allow-Origin`.*,
    `Access-Control-Allow-Credentials`(true),
    `Access-Control-Allow-Headers`("Authorization",
      "Content-Type", "X-Requested-With")
  )

  //this directive adds access control headers to normal responses
  private def addAccessControlHeaders: Directive0 = {
    respondWithHeaders(corsResponseHeaders)
  }

  //this handles preflight OPTIONS requests.
  private def preflightRequestHandler: Route = options {
    complete(HttpResponse(StatusCodes.OK).
      withHeaders(`Access-Control-Allow-Methods`(OPTIONS, POST, PUT, GET, DELETE)))
  }

  // Wrap the Route with this method to enable adding of CORS headers
  def corsHandler(r: Route): Route = addAccessControlHeaders {
    preflightRequestHandler ~ r
  }

  // Helper method to add CORS headers to HttpResponse
  // preventing duplication of CORS headers across code
  def addCORSHeaders(response: HttpResponse):HttpResponse =
    response.withHeaders(corsResponseHeaders)

}

class RenderRoutes(owConfigToTopologyActor: ActorRef[OwConfigToTopologyActor.Command])
                  (renderActor: ActorRef[RenderActor.RenderCommand])
                  (implicit val system: ActorSystem[_]) extends CORSHandler  {

  //#user-routes-class
  import JsonFormats._
  import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
  //#import-json-formats

  // If ask takes more time than this to complete the request is failed
  //private implicit val timeout = 33.;//Timeout.create(system.settings.config.getDuration("my-app.routes.ask-timeout"))
  implicit val timeout: Timeout = 33.seconds
  implicit val ec = system.executionContext
  implicit val jobFormat = jsonFormat2(TemplateFile)
  implicit val formats = DefaultFormats

  def getJson(): Future[String] =  owConfigToTopologyActor.ask(OwConfigToTopologyActor.RenderIt(_))

  def assets = {
    def redirectSingleSlash =
      pathSingleSlash {
        get {
          redirect("index.html", PermanentRedirect)
        }
      }
    getFromResourceDirectory("web") ~ redirectSingleSlash
  }

  def renderRoutes(): Route = {
    concat(
      get {
        path("render") {
          complete(getJson())
        }
      },
      get {
        corsHandler(
          path("renderTemplate") {
          parameters("fileName".as[String]) { (fileName) =>
            //println(fileName)
            val m = renderActor.ask(RenderTemplate(fileName, _))
            val s = m.flatMap(s => {
              s match {
                case RenderActor.RenderedTemplate(value, _) => {
                  Future(value)
                }
              }
            })
            complete(s)
          }
        })
      },
      get {
        path("renderow") {
          complete(owConfigToTopologyActor.ask(OwConfigToTopologyActor.ParseConfig("OW", "./src/main/resources/conf_ow.json", _)))
        }
      },
      get {
        path("renderbki") {
          complete(owConfigToTopologyActor.ask(OwConfigToTopologyActor.ParseConfig(
            "BKI",
            "C:\\projects\\temp\\alfabank\\bki\\C5486671.Обогащение данных введённых в область dmin_risk\\oozie_workflows\\reg\\wf_reg_imbr_cre_req_deriveddata_daily\\conf\\conf.json", _)))
        }
      },
      post {
        path("template") {
          entity(as[TemplateFile]) { tfile => {
            println(tfile)
            complete("Job added")
          }
        }
          /*val operationPerformed: Future[JobRepository.Response] =
            buildJobRepository.ask(JobRepository.AddJob(job, _))
          onSuccess(operationPerformed) {
            case JobRepository.OK         => complete("Job added")
            case JobRepository.KO(reason) => complete(StatusCodes.InternalServerError -> reason)
          }*/
        }
      },
      assets
    )
  }
}
