// @ts-check

import { expect } from '@wdio/globals'
import CalculatorPage from '../pageobjects/calculator.page.js'

describe('Test some calculations', () => {

    before(async () => {
        await CalculatorPage.open();
    });

    after(async () => {
        await CalculatorPage.close();
    });

    context('When we are suming', function () {
        it('should sum 1+2', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('1');
            await CalculatorPage.pressButton('+');
            await CalculatorPage.pressButton('2');
            result = await CalculatorPage.result();
            await expect(result).toBe('3');
        })

        it('should sum 3+5', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('3');
            await CalculatorPage.pressButton('+');
            await CalculatorPage.pressButton('5');
            result = await CalculatorPage.result();
            await expect(result).toBe('8');
        })
    });

    context('When we are substracting', function () {
        it('should substract 6-3', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('6');
            await CalculatorPage.pressButton('-');
            await CalculatorPage.pressButton('3');
            result = await CalculatorPage.result();
            await expect(result).toBe('3');
        })

        it('should substract 9-2', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('9');
            await CalculatorPage.pressButton('-');
            await CalculatorPage.pressButton('2');
            result = await CalculatorPage.result();
            await expect(result).toBe('7');
        })
    });

    context('When we are multipliying', function () {
        it('should multiply 3*4', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('3');
            await CalculatorPage.pressButton('*');
            await CalculatorPage.pressButton('4');
            result = await CalculatorPage.result();
            await expect(result).toBe('12');
        })

        it('should multiply 7*6', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('7');
            await CalculatorPage.pressButton('*');
            await CalculatorPage.pressButton('6');
            result = await CalculatorPage.result();
            await expect(result).toBe('42');
        })
    });

    context('When we are dividing', function () {
        it('should divide 8/2', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('8');
            await CalculatorPage.pressButton('/');
            await CalculatorPage.pressButton('2');
            result = await CalculatorPage.result();
            await expect(result).toBe('4');
        })

        it('should divide 9/3', async () => {
            var result;
            await CalculatorPage.pressButton('AC');
            await CalculatorPage.pressButton('9');
            await CalculatorPage.pressButton('/');
            await CalculatorPage.pressButton('3');
            result = await CalculatorPage.result();
            await expect(result).toBe('3');
        })
    });
})