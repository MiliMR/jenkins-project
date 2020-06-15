const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
var reportPath = process.env.REPORT_PATH_ANALYSIS;
var reportContent = fs.readFileSync(reportPath).toString();
const dom = new jsdom.JSDOM(reportContent);
var matches = dom.window.document.querySelectorAll(vulnerabilityTag);
if(Number(matches.length) > Number(process.env.MAX_VULNERABILITY)){
    try{
        throw new Error(" Expected: < "+ process.env.MAX_VULNERABILITY + "\n Received:   " + matches.length);
    }catch(e){
        console.log(e.message);
    }
}else{
    console.log("Test Suites: 1 passed");
}
