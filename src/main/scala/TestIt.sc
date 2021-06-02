import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.{DefaultFormats, JNothing}
import org.json4s.jackson.JsonMethods.{compact, parse}
import org.json4s.jackson.JsonMethods
import org.json4s.jackson.Serialization.read

import scala.collection.mutable.ListBuffer
import scala.io.Source.fromFile
import java.nio.charset.CodingErrorAction
import scala.io.Codec
import scala.xml._

implicit val codec = Codec("UTF-8")
codec.onMalformedInput(CodingErrorAction.REPLACE)
codec.onUnmappableCharacter(CodingErrorAction.REPLACE)

val xml = XML.loadFile("C:\\a\\workflow.xml")

val list = (xml \\ "action")
  .filter(a =>  (a \ "@name").toString().contains("wf_export_imbr_imbr_cre") )
val tables = for {
    a <- list
    p <- (a \\ "sub-workflow" \\ "configuration" \\ "property")
    if (p \\ "name").map(_.text)(0) == "table_name"
  } yield ((a \ "@name").toString().replace("wf_export_imbr_", ""), (p \ "value").map(_.text)(0))
tables.toList