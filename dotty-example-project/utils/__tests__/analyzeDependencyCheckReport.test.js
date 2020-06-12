const jsdom = require("jsdom");
test('Search Vulnerabilities in DependencyCheckReport', async () => {
    var fs = require("fs");
    var directory = "../target/scala-0.24/dependency-check-report.xml";
    var document = fs.readFileSync(directory).toString();
    var vulnerabilityTag = "vulnerabilityIds[confidence=\"HIGHEST\"]";
    const dom = new jsdom.JSDOM(document);
    expect(dom.window.document.querySelector(vulnerabilityTag)).toBeNull();
});
