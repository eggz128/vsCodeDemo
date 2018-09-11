console.log("First")

const { Builder, By, Key, until } = require('selenium-webdriver');

const chai = require('chai');
const assert = chai.assert;
const addContext = require('mochawesome/addContext');
let utils = require('../functionlib');
require('chromedriver');
require('geckodriver');
let driver;

describe("My Test Suite", function () {
    this.timeout(0);

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 10000,
            script: 2000
        })
    })

    afterEach(async function () {
        await driver.quit();
    })

    it.skip('Another Test', async function () {
        await console.log('Hi there');
        driver.sleep(3000);
        addContext(this, "simple string")
        addContext(this, "http://www.edgewordstraining.co.uk/")
        assert.equal("Steve", "SteveP", "Or is it?")
    })

    it('My Test', async function myAsyncFunction() {

        await driver.get("https://www.edgewordstraining.co.uk/demo-site/");
        await driver.findElement(By.id("woocommerce-product-search-field-0")).clear();
        await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap" + Key.ENTER); //Change Keys to Key
        let addButton = await utils.waitUtil(driver, By.name("add-to-cart"), 5000)
        //let addButton = await driver.wait(until.elementLocated(By.name("add-to-cart")), 5000, "Add button is not there")
        await driver.findElement(By.name("add-to-cart")).click();
        //View cart
        await driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='/'])[2]/following::a[1]")).click();
        //Assert to check cap has been added
        //first get the td cell with the product name in
        let productadded = await driver.wait(until.elementLocated(By.xpath("//td[@class='product-name']")), 5000);
        //get the text
        let productAddedText = await productadded.getText();
        //Check we get what we wanted
        assert.equal(productAddedText, "Cap", "Something else was added")

        await driver.findElement(By.linkText("×")).click();
        let returnLink = await driver.wait(until.elementLocated(By.linkText("Return to shop")), 5000, "Return Link is not there")
        await returnLink.click();
    })
})








