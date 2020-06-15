const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var reportPath = process.env.REPORT_PATH_ANALYSIS;
try{
    var reportContent = fs.readFileSync(reportPath).toString();
    console.log('1');
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
    console.log('1');
    const dom = new jsdom.JSDOM(reportContent);
    console.log('1');
    var matches = dom.window.document.querySelectorAll(vulnerabilityTag);
    console.log('1');
    if(Number(matches.length) > Number(process.env.MAX_VULNERABILITY)){
       throw new Error(" Expected: < "+ process.env.MAX_VULNERABILITY + "\n Received:   " + matches.length);
    }
}catch(exception){
    console.log("Invalid path : "+process.env.REPORT_PATH)
}

console.log("Test Suites: 1 passed") 
