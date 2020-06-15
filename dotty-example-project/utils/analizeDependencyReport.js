const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var reportPath = process.env.REPORT_PATH_ANALYSIS;
try{
    var reportContent = fs.readFileSync(reportPath).toString();
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
    const dom = new jsdom.JSDOM(reportContent);
    var matches = dom.window.document.querySelectorAll(vulnerabilityTag);
    console.log(matches.length + " " + process.env.MAX_VULNERABILITY);
    if(Number(matches.length) > Number(process.env.MAX_VULNERABILITY)){
        try{
            throw new Error(" Expected: < "+ process.env.MAX_VULNERABILITY + "\n Received:   " + matches.length);
        }catch(e){
            console.log(e.message);
        }
    }else{
        console.log("Test Suites: 1 passed") 
    }
}catch(exception){
    console.log("Invalid path : "+process.env.REPORT_PATH_ANALYSIS)
}
