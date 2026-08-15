
import { expect } from "@playwright/test";
import { test } from "../Fixtures/BaseFixtures.ts";
import CommonData from "../TestData/CommonData.json" with { type: "json" };
import LeadData from "../TestData/LeadData.json" with { type: "json" };


test.describe.configure({ mode: 'serial' });

test.describe("Lead Module Scenarios", () => {

  test("TC02 - Verify Create Lead", async ({ page, loginPage, homePage, leadPage, createLeadPage }) => {
    await loginPage.login(CommonData.login.userName, CommonData.login.password);
    await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    await homePage.openLeadsModule();
    await leadPage.openCreateLeadPage();
    await createLeadPage.selectLeadNameTitle(LeadData.createLeadData.nameTitle);
    await expect(await createLeadPage.getLeadCompanyLabelText()).toContain("Company");
    await createLeadPage.createLead({
      title: LeadData.createLeadData.nameTitle,
      firstName: LeadData.createLeadData.firstName,
      lastName: LeadData.createLeadData.lastName,
      company: LeadData.createLeadData.companyName,
    });
    await expect(page).toHaveURL(/action=DetailView/);
  });

  test("TC02a - Verify Company Label on Create Lead page", async ({ page, loginPage, homePage, leadPage, createLeadPage }) => {
    await loginPage.login(CommonData.login.userName, CommonData.login.password);
    await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    await homePage.openLeadsModule();
    await leadPage.openCreateLeadPage();
    await createLeadPage.selectLeadNameTitle(LeadData.createLeadData.nameTitle);
    const companyLabelText = await createLeadPage.getLeadCompanyLabelText();
    await expect(companyLabelText).toContain("Company");
  });

  test("TC03 - Verify Create Lead Save button is visible", async ({ page, loginPage, homePage, leadPage }) => {
    await loginPage.login(CommonData.login.userName, CommonData.login.password);
    await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    await homePage.openLeadsModule();
    await leadPage.openCreateLeadPage();
    const saveButton = page.locator("input[value='Save'], input[class*='save']").first();
    await expect(saveButton).toBeVisible();
  });

  test("TC04 - Verify Leads search defaults to Lead No", async ({ page, loginPage, homePage, leadPage }) => {
    await loginPage.login(CommonData.login.userName, CommonData.login.password);
    await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    await homePage.openLeadsModule();
    const searchField = page.locator("select[name='search_field']").first();
    const selectedText = await searchField.evaluate((select) => {
      const element = select as HTMLSelectElement;
      return element.options[element.selectedIndex]?.text || "";
    });
    await expect(selectedText).toContain("Lead No");
  });

  test("TC05 - Verify Search Lead", async ({ page, loginPage, homePage, leadPage }) => {
    await loginPage.login(CommonData.login.userName, CommonData.login.password);
    await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    await homePage.openLeadsModule();
    await leadPage.searchLead("LEA16");
    await leadPage.clickOnLeadRecord();
    await expect(page).toHaveURL(/record=/);
  });

});


