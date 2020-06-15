const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
var reportPath = process.env.REPORT_PATH_ANALYSIS;
try{
    var reportContent = fs.readFileSync(reportPath).toString();
    const dom = new jsdom.JSDOM(reportContent);
    var matches = dom.window.document.querySelectorAll(vulnerabilityTag);
    if(Number(matches.length) > Number(process.env.MAX_VULNERABILITY)){
        throw new Error(true);
    }else{
        console.log("Test Suites: 1 passed");
    }
}catch(exception){
    if (excepcion) {
      console.log(" Expected: < "+ process.env.MAX_VULNERABILITY + "\n Received:   " + matches.length);
      throw excepcion;
   }
    console.log("Invalid path : " + reportPath);
}
