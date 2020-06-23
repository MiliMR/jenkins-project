lazy val root = project
  .in(file("."))
  .settings(
    name := "dotty-example-project",
    description := "Example sbt project that compiles using Dotty",
    version := "0.1.0",
    scalaVersion := "0.24.0-RC1",
    dependencyCheckFormats := Seq("XML","HTML"),
    dependencyCheckOutputDirectory := Some(file(sys.env.get("REPORTS_OUTPUT")+"/dotty-example-project"))
  )
  libraryDependencies ++= Seq(
    "org.postgresql" % "postgresql" % "9.4-1206-jdbc42"
  )

