// @ts-check

import Page from './page.js';

const RESULT_DISPLAY_ID = 'id=com.google.android.calculator:id/result_preview';

const CALCULATOR_KEY_SELECTOR = {
    '0': 'id=com.google.android.calculator:id/digit_0',
    '1': 'id=com.google.android.calculator:id/digit_1',
    '2': 'id=com.google.android.calculator:id/digit_2',
    '3': 'id=com.google.android.calculator:id/digit_3',
    '4': 'id=com.google.android.calculator:id/digit_4',
    '5': 'id=com.google.android.calculator:id/digit_5',
    '6': 'id=com.google.android.calculator:id/digit_6',
    '7': 'id=com.google.android.calculator:id/digit_7',
    '8': 'id=com.google.android.calculator:id/digit_8',
    '9': 'id=com.google.android.calculator:id/digit_9',
    '+': 'id=com.google.android.calculator:id/op_add',
    '-': 'id=com.google.android.calculator:id/op_sub',
    '*': 'id=com.google.android.calculator:id/op_mul',
    '/': 'id=com.google.android.calculator:id/op_div',
    '=': 'id=com.google.android.calculator:id/eq',
    '.': 'id=com.google.android.calculator:id/dec_point',
    'AC': 'id=com.google.android.calculator:id/clr',
    '()': 'id=com.google.android.calculator:id/parens',
    'DEL': 'id=com.google.android.calculator:id/del',
    'SQRT': 'id=com.google.android.calculator:id/op_sqrt',
    'PI': 'id=com.google.android.calculator:id/const_pi',
    'POW': 'id=com.google.android.calculator:id/op_pow',
    '!': 'id=com.google.android.calculator:id/fact',
}

/**
 * Calculator page class
 */
class CalculatorPage extends Page {
    /**
     * Get button element by key
     * @param {string} buttonKey
     */
    getButton(buttonKey) {
        // See: https://webdriver.io/docs/api/webdriver/#findelement
        return $(CALCULATOR_KEY_SELECTOR[buttonKey]);
    }

    /**
     * Press button
     * @param {string} buttonKey
     */
    async pressButton(buttonKey) {
        // See: http://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#click
        await this.getButton(buttonKey).click();
    }

    async resultPreview() {
        // See: https://webdriver.io/docs/api/element/isExisting/
        await $(RESULT_DISPLAY_ID).isExisting();
        // See: http://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#gettext
        return await $(RESULT_DISPLAY_ID).getText();
    }

    // To see other properties and methods supported for the driver, check:
    // https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/
}

export default new CalculatorPage();