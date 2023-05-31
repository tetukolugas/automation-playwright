export default class CartPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    cartItems: 'css=.cart_item',
    productNames: 'css=.inventory_item_name',
    productPrices: 'css=.inventory_item_price',
    checkoutButton: 'css=.checkout_button',
  };

  async getProductNames() {
    return await this.page.$$eval(this.selectors.productNames, (elements) =>
      elements.map((el) => el.textContent)
    );
  }

  async getProductPrices() {
    return await this.page.$$eval(this.selectors.productPrices, (elements) =>
      elements.map((el) => parseFloat(el?.textContent?.replace('$', '') ?? ''))
    );
  }

  async clickCheckoutButton() {
    await this.page.click(this.selectors.checkoutButton);
  }
}
