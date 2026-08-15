import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../Utils/BasePage.ts";

export class CreateLeadPage extends BasePage {


    readonly leadNameTitleDD: Locator;
    readonly leadFirstNameTB: Locator;
    readonly leadLastNameTB: Locator;
    readonly leadCompanyLabel: Locator;
    readonly leadCompanyTB: Locator;
    readonly leadSaveBT: Locator;
    constructor(page: Page) {
        super(page);
        this.leadNameTitleDD = page.locator("select[name='salutationtype']");
        this.leadFirstNameTB = page.locator("input[name='firstname']");
        this.leadLastNameTB = page.locator("input[name='lastname']");
        this.leadCompanyLabel = page.locator("input[name='company']").locator("xpath=preceding::td[1]");
        this.leadCompanyTB = page.locator("input[name='company']");
        this.leadSaveBT = page.locator("input[value='Save'], input[class*='save']").first();
    }


    async selectLeadNameTitle(label: string){
        await this.leadNameTitleDD.waitFor({ state: 'visible', timeout: 120000 });
        await this.selectOptionByLabel(this.leadNameTitleDD, label);
    };

    async createLead(leadData: { title: string; firstName: string; lastName: string; company: string }){
        await this.selectLeadNameTitle(leadData.title);
        await this.enterLeadFirstName(leadData.firstName);
        await this.enterLeadLastName(leadData.lastName);
        await this.enterLeadCompany(leadData.company);
        await this.clickOnLeadSaveBT();
    }


    async enterLeadFirstName(firstName: string){
        await this.fill(this.leadFirstNameTB, firstName);
    };

    async enterLeadLastName(lastName: string){
        await this.fill(this.leadLastNameTB, lastName);
    };


    async enterLeadCompany(company: string){
        await this.fill(this.leadCompanyTB, company);
    };

    async getLeadCompanyLabelText(): Promise<string> {
        const companyInput = this.page.locator("input[name='company']");
        await companyInput.waitFor({ state: 'visible', timeout: 120000 });
        const labelText = await companyInput.evaluate((element) => {
            const cell = (element as HTMLElement).closest('td');
            const labelCell = cell?.previousElementSibling as HTMLElement | null;
            return labelCell?.innerText?.trim() ?? '';
        });

        if (labelText) {
            return labelText;
        }

        const fallbackText = this.page.getByText(/Company/i).first();
        return (await fallbackText.count()) ? await fallbackText.innerText() : '';
    }

    async clickOnLeadSaveBT(){
        await this.click(this.leadSaveBT);
    }

    
}