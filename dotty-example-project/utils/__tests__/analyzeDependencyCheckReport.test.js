const jsdom = require("jsdom");
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    var directory = process.env.REPORT_FILE;
    var document = fs.readFileSync(directory).toString();
    //var vulnerabilityTag = "vulnerabilityIds[confidence=\"HIGHEST\"]";
    var vulnerabilityTag = "software[vulnerabilityIdMatched=\"true\"]"
    const dom = new jsdom.JSDOM(document);
    expect(dom.window.document.querySelector(vulnerabilityTag)).toBeNull();
});
