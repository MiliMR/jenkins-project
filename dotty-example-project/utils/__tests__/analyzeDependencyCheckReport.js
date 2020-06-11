const puppeteer = require('puppeteer');
require('expect-puppeteer');

let page, browser;
const TIMEOUT = 120000 

describe('Starter Analysis', () => {
    beforeAll(async () => {
      browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 50
      });
      page = await browser.newPage();
    })

    afterAll(async() => {
      await browser.close();
    })
  
    it('Search Vulnerabilities in DependencyCheckReport', async () => {
      // Log in
      await page.goto('http://localhost:8089/job/pipeline-blue-ocean/job/MiliMR-patch-1/61/execution/node/3/ws/dotty-example-project/target/scala-0.24/dependency-check-report.html');
      await expect(page).toFill('name[id="j_username"]', "admin", { timeout: TIMEOUT });
      await expect(page).toFill('name[id="j_password"]', "01d6796e02a142ef8403b106d5b82c32", { timeout: TIMEOUT });
      await expect(page).toClick('button[name="Submit"]', { timeout: TIMEOUT });

      let vulnerableDependencies = await messageNewAcc.$x('//span[@id="vulnerableCount"]');
      let numberOfDependencies = await vulnerableDependencies[0].getProperty('textContent');
      let numberOfDependenciesValue = await numberOfDependencies.jsonValue();
      
      await expect(numberOfDependenciesValue).toMatch("0", { timeout: timeObject.actionTimeout });
    }, TIMEOUT);
    
    });
})
