// @ts-check

const APP_PACKAGE = 'com.google.android.calculator';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    async open() {
        // See: https://webdriver.io/docs/api/webdriver/#settimeouts
        await driver.setTimeouts(10000);
        // See: http://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#activateapp
        await driver.execute('mobile: activateApp', { 'appId': APP_PACKAGE });
        // See: https://webdriver.io/docs/api/webdriver/#findelement
        await $('id=com.google.android.calculator:id/main_calculator').isExisting();
    }
    async close() {
        // See: http://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#terminateapp
        await driver.execute('mobile: terminateApp', { 'appId': APP_PACKAGE });
    }

    // To see other properties and methods supported for the driver, check:
    // https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/
}
