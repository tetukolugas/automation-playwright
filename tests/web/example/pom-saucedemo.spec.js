// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../../../page-objects/login-page';
import InventoryPage from '../../../page-objects/inventory-page';
import CartPage from '../../../page-objects/cart-page';
import CheckoutPage from '../../../page-objects/checkout-page';
import OverviewPage from '../../../page-objects/overview-page';

test.describe('Shopping Cart Checkout', () => {
  test('should successfully complete the checkout process', async ({ page }) => {
    // Page Initialization
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const overviewPage = new OverviewPage(page)

    // Go To Base URL
    await page.goto('/');

    // Login
    await loginPage.login('standard_user', 'secret_sauce');

    // Browse Products
    await inventoryPage.sortProductsByLowestPrice();

    const productNames = await inventoryPage.getProductNames();
    const productPrices = await inventoryPage.getProductPrices();
    const sortedProductNames = [...productNames];
    const sortedProductPrices = [...productPrices].sort((a, b) => a - b);

    expect(productPrices).toEqual(sortedProductPrices);

    // Add to Cart
    await inventoryPage.addToCart();
    await inventoryPage.goToCart();

    // Check Cart
    const cartProductNames = await cartPage.getProductNames();
    const cartProductPrices = await cartPage.getProductPrices();

    expect(cartProductNames).toContain(sortedProductNames[0]);
    expect(cartProductPrices).toContain(sortedProductPrices[0]);

    // Checkout
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutForm('John', 'Doe', '57419');
    await checkoutPage.waitForOverviewTitle();

    // Review Order
    const overviewProductNames = await overviewPage.getProductNames();
    const overviewProductPrices = await overviewPage.getProductPrices();

    expect(overviewProductNames).toContain(sortedProductNames[0]);
    expect(overviewProductPrices).toContain(sortedProductPrices[0]);

    // Finish Order
    await overviewPage.clickFinishButton();
    await overviewPage.waitForCompleteTitle();
  });
});
