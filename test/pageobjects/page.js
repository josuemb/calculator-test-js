/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    async open() {
        driver.setImplicitTimeout(10000);
        driver.launchApp();
        await $('id=com.google.android.calculator:id/main_calculator').isExisting();
    }
    async close() {
        driver.closeApp();
    }
}
