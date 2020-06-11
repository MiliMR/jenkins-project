const jsdom = require("jsdom");
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    var document = fs.readFileSync("../target/scala-0.24/dependency-check-report.xml").toString();
    const dom = new jsdom.JSDOM(document);
    console.log(dom.window.document.querySelector("vulnerabilityIds").textContent);
});
