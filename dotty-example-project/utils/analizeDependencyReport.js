const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
var reportPath = process.env.REPORT_PATH;
try{
  var reportContent = fs.readFileSync(reportPath).toString();
  const dom = new jsdom.JSDOM(reportContent);
  var match = dom.window.document.querySelector(vulnerabilityTag);
  if(match == null){
    console.log("Not found Vulnerabilities");
  }else{
    throw new Error('Detected');
  }
}catch(exception){
  if (exception.message == 'Detected') {
    console.log("Vulnerabilities Found");
    throw exception;
  }
  else if (exception.code == 'ENOENT'){
    console.log("Invalid path : " + reportPath);
    throw exception;
  }
}
