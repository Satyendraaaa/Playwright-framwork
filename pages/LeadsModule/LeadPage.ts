import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../Utils/BasePage.ts";

export class LeadPage extends BasePage {


    readonly leadPluseButton: Locator;
    readonly leadSearchBox: Locator;
    readonly leadSearchDD: Locator;
    readonly leadSearchBT: Locator;
    readonly leadLastNameRecord: Locator;

    constructor(page: Page) {
        super(page);
        this.leadPluseButton = page.locator("img[title='Create Lead...']").first();
        this.leadSearchBox = page.locator("input[name='search_text']");
        this.leadSearchDD = page.locator("select[name='search_field']").first();
        this.leadSearchBT = page.locator("input[name='submit']").first();
        this.leadLastNameRecord = page.locator("a[href*='action=DetailView&record=']").filter({ hasNot: page.locator('img') }).first();
    };


    async clickOnCreateLeadBT() {
        await this.click(this.leadPluseButton);
    };

    async openCreateLeadPage() {
        await this.clickOnCreateLeadBT();
    }

    async searchBoxLeadText(leadNo: string) {
        await this.fill(this.leadSearchBox, leadNo);
    };

    async searchLeadDropDown() {
        await this.selectOptionByLabel(this.leadSearchDD, "Lead No");
    };

    async clickOnSearchLeadButton() {
        await this.click(this.leadSearchBT);
    };

    async searchLead(leadNo: string) {
        await this.searchBoxLeadText(leadNo);
        await this.searchLeadDropDown();
        await this.clickOnSearchLeadButton();
    }

    async clickOnLeadRecord() {
        await this.page.waitForLoadState('domcontentloaded');
        const recordLink = this.page.locator("a[href*='action=DetailView&record=']").filter({ hasNot: this.page.locator('img') }).first();
        await recordLink.waitFor({ state: 'attached', timeout: 120000 });
        const href = await recordLink.getAttribute('href');
        if (!href) {
            throw new Error('Unable to find lead record link href');
        }
        await this.page.goto(href);
    };
}




