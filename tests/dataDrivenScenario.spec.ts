import { expect } from "@playwright/test";
import { test } from "../Fixtures/BaseFixtures.ts";
import loginData from "../TestData/LoginData.json" with { type: "json" };
// import { LoginPage } from "../pages/LoginPage.ts";
// import { HomePage } from "../pages/HomePage.ts";
// import { LeadPage } from "../pages/LeadsModule/LeadPage.ts";


////============================== DATA DEIVEN LoginPage TESTING =================================////

loginData.forEach((data) => {

  test(`verify Login Page - ${data.label}`, async ({ page, loginPage }) => {

    //   let loginPage =  new LoginPage(page);
    await loginPage.login(data.userName, data.password);

    if (data.status === "valid") {
      await expect(page).toHaveTitle(/Administrator - Home - vtiger CRM/);
    } else {
      await expect(loginPage.userNameTB).toBeVisible();
    }

  });


});



////============================== DATA DEIVEN LeadPage TESTING =================================////

