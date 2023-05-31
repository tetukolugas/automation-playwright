export default class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    firstName: 'id=first-name',
    lastName: 'id=last-name',
    postalCode: 'id=postal-code',
    continueButton: 'css=.submit-button',
    overviewTitle: 'css=.title:has-text("Checkout: Overview")',
  };

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.page.waitForSelector(this.selectors.firstName);
    await this.page.fill(this.selectors.firstName, firstName);
    await this.page.fill(this.selectors.lastName, lastName);
    await this.page.fill(this.selectors.postalCode, postalCode);
    await this.page.click(this.selectors.continueButton);
  }

  async waitForOverviewTitle() {
    await this.page.waitForSelector(this.selectors.overviewTitle);
  }
}
