import {Page, Locator} from "@playwright/test";
import {BasePage} from "../Utils/BasePage.ts";



export class LoginPage extends BasePage {

    readonly userNameTB: Locator;
    readonly passwordTB: Locator;
    readonly loginBT: Locator
    constructor(page: Page) {
        super(page);
        this.userNameTB = page.locator("//input[@name='user_name']");
        this.passwordTB = page.locator("//input[@name='user_password']");
        this.loginBT = page.locator("//input[@id='submitButton']");


    }


    async enterUrlLink(url: string) {
        await this.hitUrl(url);
    }

    async login(username: string, password: string) {
        await this.page.goto("/", { waitUntil: 'domcontentloaded' });
        await this.enterUserName(username);
        await this.enterUserPassword(password);
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 120000 }),
            this.clickOnLoginButton()
        ]);
        await this.page.waitForFunction(() => document.title.includes("vtiger CRM"), { timeout: 120000 });
    }

    async enterUserName(username: string) {
        await this.fill(this.userNameTB, username);
    }

    async enterUserPassword(password: string) {
        await this.fill(this.passwordTB, password);
    }

    async clickOnLoginButton() {
        await this.click(this.loginBT);
    }

}


// │
// ├── tests/
// ├── pages/
// ├── fixtures/
// ├── hooks/
// │   └── hooks.ts
// ├── utils/
// └── playwright.config.ts