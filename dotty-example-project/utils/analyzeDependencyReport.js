const jsdom = require("jsdom");
require('dotenv').config();
var fs = require("fs");
var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
var reportPath = process.env.REPORT_PATH_PROJECT;
console.log(analyze(reportPath) + process.env.PROJECT_NAME);
var reportPath = process.env.REPORT_PATH_SUB_PROJECT;
console.log(analyze(reportPath) + process.env.SUB_PROJECT_NAME);

function analyze (reportPath){
    try {
        var reportContent = fs.readFileSync(reportPath).toString();
        const dom = new jsdom.JSDOM(reportContent);
        var match = dom.window.document.querySelector(vulnerabilityTag);
        if (match != null) {
            return "Vulnerabilities Found ";
        }
    } catch (exception) {
        if (exception.code == 'ENOENT') {
            console.log("Invalid path : " + reportPath);
        }
        throw exception;
    }
}

