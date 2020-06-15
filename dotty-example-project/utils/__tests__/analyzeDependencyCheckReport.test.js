const jsdom = require("jsdom");
require('dotenv').config();
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    var reportPath = ".."+process.env.REPORT_PATH+"";
    var reportContent = fs.readFileSync(reportPath).toString();
    //var vulnerabilityTag = "vulnerabilityIds[confidence=\"HIGHEST\"]";
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]";
    const dom = new jsdom.JSDOM(reportContent);
    var matches = dom.window.document.querySelectorAll(vulnerabilityTag);
    //expect(Number(matches.length)).toBeLessThan(Number(process.env.MAX_VULNERABILITY));
    
    if(Number(matches.length) > Number(process.env.MAX_VULNERABILITY)){
        process.env.VULNERABILITY_DETECTED = "true";
    }
    
});
