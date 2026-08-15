import {Page, Locator} from "@playwright/test";
import {BasePage} from "../Utils/BasePage.ts";

export class HomePage extends BasePage {

readonly leadLink:Locator;

    constructor(page:Page){
        super(page);
        this.leadLink=page.locator("a[href*='module=Leads&action=index']").first();
    }


    async clickOnLeadLink(){
        await this.click(this.leadLink);

    }

    async openLeadsModule(){
        await this.clickOnLeadLink();
    }

}