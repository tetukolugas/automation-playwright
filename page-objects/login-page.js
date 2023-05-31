const { expect } = require('@playwright/test');
import { devices, ElementHandle, Locator, Page } from '@playwright'

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = new Page;
  }

  selectors = {
    usernameInput: 'id=user-name',
    passwordInput: 'id=password',
    loginButton: 'css=.btn_action',
  };

  async login(username, password) {
    await this.page.waitForSelector(this.selectors.usernameInput);
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);
    await this.page.click(this.selectors.loginButton);
  }
}
