import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import { HomePage } from "../pages/HomePage.ts";
import { LeadPage } from "../pages/LeadsModule/LeadPage.ts";
import { CreateLeadPage } from "../pages/LeadsModule/CreateLeadPage.ts";

type myFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    leadPage: LeadPage;
    createLeadPage: CreateLeadPage;
}


export const test = base.extend<myFixtures>({

    loginPage: async ({ page }, use) => {
        let loginPage: LoginPage = new LoginPage(page);
        await use(loginPage);
    },


    homePage: async ({ page }, use) => {
        let homePage: HomePage = new HomePage(page);
        await use(homePage);
    },

    leadPage: async ({ page }, use) => {
        let leadPage: LeadPage = new LeadPage(page);
        await use(leadPage);
    },


    createLeadPage: async ({ page }, use) => {
        let createLeadPage: CreateLeadPage = new CreateLeadPage(page);
        await use(createLeadPage);
    }




});