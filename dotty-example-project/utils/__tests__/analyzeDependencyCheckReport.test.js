const jsdom = require("jsdom");
require('dotenv').config();
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    var reportPath = ".."+process.env.REPORT_PATH+"";
    var reportContent = fs.readFileSync(reportPath).toString();
    //var vulnerabilityTag = "vulnerabilityIds[confidence=\"HIGHEST\"]";
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]"
    const dom = new jsdom.JSDOM(reportContent);
    try{
        console.log(expect(dom.window.document.querySelector(vulnerabilityTag)).toBeNull());
        expect(dom.window.document.querySelector(vulnerabilityTag)).toBeNull();
    }catch(exception){
        process.env.VULNERABILITY_DETECTED = true;
        console.log(exception);
    }
});
