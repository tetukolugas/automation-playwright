// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Checkout', () => {
  test('should successfully complete the checkout process', async ({ page }) => {
    // Go To Base URL
    await page.goto('/');

    // Login
    await page.waitForSelector('id=user-name');
    await page.fill('id=user-name', 'standard_user');
    await page.fill('id=password', 'secret_sauce');
    await page.click('css=.btn_action');
    await page.waitForSelector('css=.inventory_container');

    // Sort by Lowest Price
    const productPrices = await page.$$eval(
        'css=.inventory_item_price',
        (elements) => elements.map((el) => parseFloat(el?.textContent?.replace('$', '') ?? ''))
    );
    await page.click('css=.product_sort_container');
    await page.locator('[data-test="product_sort_container"]').selectOption('lohi');

    const sortedProductNames = await page.$$eval(
        'css=.inventory_item_name',
        (elements) => elements.map((el) => el.textContent)
    );
    const sortedProductPrices = await page.$$eval(
        'css=.inventory_item_price',
        (elements) => elements.map((el) => parseFloat(el?.textContent?.replace('$', '') ?? ''))
    );

    expect(productPrices.sort((a, b) => a - b)).toEqual(sortedProductPrices);

    // Add to Cart
    const selectedProductName = sortedProductNames[0];
    const selectedProductPrice = sortedProductPrices[0];

    await page.click('css=.btn_primary');
    await page.click('css=.shopping_cart_link');

    // Check Out
    await page.waitForSelector('css=.cart_item');
    const cartProductNames = await page.$$eval(
        'css=.inventory_item_name',
        (elements) => elements.map((el) => el.textContent)
    );
    const cartProductPrices = await page.$$eval(
        'css=.inventory_item_price',
        (elements) => elements.map((el) => parseFloat(el?.textContent?.replace('$', '') ?? ''))
    );

    expect(cartProductNames).toContain(selectedProductName);
    expect(cartProductPrices).toContain(selectedProductPrice);

    await page.click('css=.checkout_button');

    // Fill Form
    await page.waitForSelector(`css=.title:has-text("Checkout: Your Information")`);
    await page.fill('id=first-name', 'John');
    await page.fill('id=last-name', 'Doe');
    await page.fill('id=postal-code', '57419');
    await page.click('css=.submit-button');

    // Review Order
    await page.waitForSelector('css=.title:has-text("Checkout: Overview")');
    const overviewProductNames = await page.$$eval(
        'css=.inventory_item_name',
        (elements) => elements.map((el) => el.textContent)
    );
    const overviewProductPrices = await page.$$eval(
        'css=.inventory_item_price',
        (elements) => elements.map((el) => parseFloat(el?.textContent?.replace('$', '') ?? ''))
    );

    expect(overviewProductNames).toContain(selectedProductName);
    expect(overviewProductPrices).toContain(selectedProductPrice);

    // Finish Order
    await page.click('id=finish');
    await page.waitForSelector('css=.title:has-text("Checkout: Complete!")');
  });
});
