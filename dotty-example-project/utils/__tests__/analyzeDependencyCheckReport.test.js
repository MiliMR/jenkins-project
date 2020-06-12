const jsdom = require("jsdom");
require('dotenv').config();
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    console.log(process.env.REPORT_FILE);
    var reportPath = ".."+process.env.REPORT_FILE+"";
    var reportContent = fs.readFileSync(reportPath).toString();
    //var vulnerabilityTag = "vulnerabilityIds[confidence=\"HIGHEST\"]";
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]"
    const dom = new jsdom.JSDOM(reportContent);
    expect(dom.window.document.querySelector(vulnerabilityTag)).toBeNull();
});
