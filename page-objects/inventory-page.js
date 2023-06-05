export default class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    productsContainer: '.inventory_container',
    productNames: '.inventory_item_name',
    productPrices: '.inventory_item_price',
    sortContainer: '.product_sort_container',
    addToCart: '.btn_primary',
    cartLink: '.shopping_cart_link',
  };

  async sortProductsByLowestPrice() {
    await this.page.waitForSelector(this.selectors.productsContainer);
    await this.page.click(this.selectors.sortContainer);
    await this.page.locator('[data-test="product_sort_container"]').selectOption('lohi');
  }

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

  async addToCart() {
    await this.page.click(this.selectors.addToCart);
  }

  async goToCart() {
    await this.page.click(this.selectors.cartLink);
  }
}
