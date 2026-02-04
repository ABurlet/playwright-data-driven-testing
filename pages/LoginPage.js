const { expect } = require("@playwright/test");

class LoginPage {
  /** 
    *@param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.signInButton = page.getByRole("button", { name: /sign in/i });

    this.webAppH1 = page.locator("h1", { hasText: "Web Application" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username, password) {
    await this.goto();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async verifyLoginSuccess() {
    await expect(
      this.webAppH1,
      'Expected to land on "Web Application" (h1) after login'
    ).toBeVisible();
  }
}

module.exports = { LoginPage };