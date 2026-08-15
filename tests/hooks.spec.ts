import { test } from "../Fixtures/BaseFixtures.ts";
import CommonData from "../TestData/CommonData.json" with { type: "json" };
import LeadData from "../TestData/LeadData.json" with { type: "json" };

// This file demonstrates Playwright hooks structure for setup and teardown.
// Hooks in a company test suite should handle common preconditions like login,
// but actual scenarios are implemented in dedicated spec files.

test.beforeAll(async () => { 
    // global setup can go here, such as loading shared test data.
});


test.beforeEach(async ({ loginPage }) => {
    await loginPage.enterUrlLink("/");
});


test.afterEach(async () => {
    // cleanup actions can go here.
});


test.afterAll(async()=>{


});






test ("vrify CreateLead", async ({page, loginPage, homePage, leadPage, createLeadPage})=>{
    
    await loginPage.enterUrlLink("/");
    await loginPage.enterUserName(CommonData.login.userName);
    await loginPage.enterUserPassword(CommonData.login.password);
    await loginPage.clickOnLoginButton();
    await homePage.clickOnLeadLink();
    await leadPage.clickOnCreateLeadBT();
    await createLeadPage.selectLeadNameTitle(LeadData.createLeadData.nameTitle);
    await createLeadPage.enterLeadFirstName(LeadData.createLeadData.firstName);
    await createLeadPage.enterLeadLastName(LeadData.createLeadData.lastName);
    await createLeadPage.enterLeadCompany(LeadData.createLeadData.companyName);
    await createLeadPage.clickOnLeadSaveBT();

});