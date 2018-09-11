const { By, Key, until } = require('selenium-webdriver');

async function waitUtil(driver, locator, timeout){
    try {
        let el = await driver.wait(until.elementLocated(locator),timeout);
        return el;
    } catch (error) {
        throw new Error(`Didn't find ${locator.toString} in given timeout ${timeout}`)
    }
    
}

module.exports.waitUtil = waitUtil;