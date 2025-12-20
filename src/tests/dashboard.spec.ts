import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { DashboardPage } from "../pages/dashboard.page";
import { getJsonArray, getTestData } from "../utils/testdatareader";
import { BASE_URL, VALID_USER_PATH } from "../constants/constants";

const logindata = getJsonArray("validUser", VALID_USER_PATH);
const pageUrl = getTestData("baseURL", BASE_URL);

test.describe("PlantNest Dashboard Tests", () => {
  for (const user of logindata) {
    test.describe(`Dashboard tests for ${user.username}`, () => {
      test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo(pageUrl);
        await loginPage.login(user.username, user.password);
        await loginPage.clickONSignIN();
      });

      test("Verify dashboard loads successfully", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await expect(dashboard.welcomeText).toBeVisible();
      });

      test("Verify header menu items are visible", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await expect(dashboard.dashboardMenu).toBeVisible();
        await expect(dashboard.myOrdersMenu).toBeVisible();
        await expect(dashboard.profileMenu).toBeVisible();
        await expect(dashboard.cartMenu).toBeVisible();
      });

      test("Verify search functionality", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        const searchText = "Aloe Vera";
        await dashboard.searchPlant(searchText);
        await expect(dashboard.searchResults.first()).toBeVisible();
        const count = await dashboard.searchResults.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
          const plantName = await dashboard.plantNames.nth(i).textContent();
          expect(plantName?.toLowerCase()).toContain(searchText.toLowerCase());
        }
      });

      test("Verify green collection section is displayed", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await expect(dashboard.collectionTitle).toBeVisible();
        await expect(dashboard.plantCards).not.toHaveCount(0);
      });

      test("Verify logout functionality", async ({ page }) => {
        const dashboard = new DashboardPage(page);
        await dashboard.clickLogout();
        await expect(page).toHaveURL(/login/i);
      });

      test("Verify cart count is updated after Buy Now and page reload", async ({
        page,
      }) => {
        const dashboard = new DashboardPage(page);

        await dashboard.clickFirstBuyNow();

        await page.reload();
        await expect(dashboard.cartCount).toBeVisible();

        const cartCount = await dashboard.getCartCount();
        expect(cartCount).toBeGreaterThan(0);
      });
    });
  }
});
