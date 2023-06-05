export default class LoginPage {
  constructor(page) {
    this.page = page;
  }

  selectors = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '.btn_action',
  };

  async login(username, password) {
    await this.page.waitForSelector(this.selectors.usernameInput);
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.loginButton);
  }
}
