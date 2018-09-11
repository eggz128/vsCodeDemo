console.log("First")

const {Builder, By, Key, until} = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;


require('chromedriver');
require('geckodriver');


async function myAsyncFunction(){

    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts( { 
        implicit: 10000, 
        pageLoad: 10000, 
        script: 2000 } )
    await console.log("Second")
    await driver.get("https://www.edgewordstraining.co.uk/demo-site/");
    await console.log(driver.findElement(By.id("woocommerce-product-search-field-0")))
    await driver.findElement(By.id("woocommerce-product-search-field-0")).clear();
    await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("Beanie" + Key.ENTER); //Change Keys to Key
    
    let addButton = await driver.wait(until.elementLocated(By.name("add-to-cart")),5000,"Add button is not there")
    await driver.findElement(By.name("add-to-cart")).click(); 
    //View cart
    await driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='/'])[2]/following::a[1]")).click();
    //Assert to check cap has been added
    //first get the td cell with the product name in
    let productadded = await driver.wait(until.elementLocated(By.xpath("//td[@class='product-name']")),5000);
    //get the text
    let productAddedText = await productadded.getText();
    //Check we get what we wanted
    assert.equal(productAddedText, "Cap", "Something else was added")
    
    await driver.findElement(By.linkText("×")).click();
    let returnLink = await driver.wait(until.elementLocated(By.linkText("Return to shop")),5000,"Return Link is not there")
    await returnLink.click();
    
}

myAsyncFunction();









/*
driver.manage().window().maximize(); //Fix a ChromeDriver bug
driver.get("https://www.edgewordstraining.co.uk/demo-site/")
    .then(function(){driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap" + Key.ENTER)})
    .then(_ => driver.sleep(3000)) //sync fixes - see next chapter
    .then(_ => driver.findElement(By.name("add-to-cart")).click())
    .then(_ => driver.sleep(3000)) //sync fixes - see next chapter
    .then(_ => driver.findElement(By.xpath("(//a[contains(.,'View cart')])[2]")).click())
    .then(_ => driver.sleep(3000)) //sync fixes - see next chapter
    .then(_ => driver.findElement(By.linkText("×")).click())
    .then(_ => driver.sleep(3000)) //sync fixes - see next chapter
    .then(_ => driver.findElement(By.linkText("Return to shop")).click())
//    .then(_ => driver.getTitle().then(title => console.log(title)))

*/

/*
driver.findElement(By.id("woocommerce-product-search-field-0")).click();
driver.findElement(By.id("woocommerce-product-search-field-0")).clear();
driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap");
driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys(Key.ENTER);
driver.findElement(By.name("add-to-cart")).click();
driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='/'])[2]/following::a[1]")).click();
driver.findElement(By.linkText("×")).click();
driver.findElement(By.linkText("Return to shop")).click();
//added by Steve
//console.log(driver.getTitle()); //Wont work: getTitle() returns a promise
//driver.getTitle().then(function(title){console.log(title)})
//driver.getTitle().then(title => console.log(title))
*/