export default class OverviewPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    productNames: 'css=.inventory_item_name',
    productPrices: 'css=.inventory_item_price',
    finishButton: 'id=finish',
    completeTitle: 'css=.title:has-text("Checkout: Complete!")',
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

  async clickFinishButton() {
    await this.page.click(this.selectors.finishButton);
  }

  async waitForCompleteTitle() {
    await this.page.waitForSelector(this.selectors.completeTitle);
  }
}
