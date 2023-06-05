export default class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    firstNameInput: '#first-name',
    lastNameInput: '#last-name',
    postalCodeInput: '#postal-code',
    continueButton: '.submit-button',
    overviewTitle: '.title:has-text("Checkout: Overview")',
  };

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.page.waitForSelector(this.selectors.firstNameInput);
    await this.page.fill(this.selectors.firstNameInput, firstName);
    await this.page.fill(this.selectors.lastNameInput, lastName);
    await this.page.fill(this.selectors.postalCodeInput, postalCode);
    await this.page.click(this.selectors.continueButton);
  }

  async waitForOverviewTitle() {
    await this.page.waitForSelector(this.selectors.overviewTitle);
  }
}
