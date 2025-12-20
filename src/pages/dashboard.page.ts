import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly dashboardMenu: Locator;
  readonly myOrdersMenu: Locator;
  readonly profileMenu: Locator;
  readonly cartMenu: Locator;
  readonly logoutButton: Locator;

  readonly welcomeText: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly collectionTitle: Locator;
  readonly plantCards: Locator;
  readonly buyNowButtons: Locator;
  readonly searchResults: Locator;
  readonly plantNames: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.locator("text=PlantNest");
    this.dashboardMenu = page.locator("text=Dashboard");
    this.myOrdersMenu = page.locator("text=My Orders");
    this.profileMenu = page.locator("text=Profile");
    this.cartMenu = page.locator("text=Cart");
    this.cartIcon = page.locator('a:has-text("Cart")');
    this.logoutButton = page.locator("text=Logout");

    this.welcomeText = page.locator("text=Welcome to PlantNest!");
    this.searchInput = page.locator(
      'input[placeholder="Search for your favorite plant..."]'
    );
    this.searchButton = page.locator('button:has-text("Search")');
    this.collectionTitle = page.locator("text=Our Green Collection");
    this.plantCards = page.locator(".card.product-card");
    this.buyNowButtons = page.locator("button:has-text('Buy Now')");
    this.searchResults = page.locator(".card.product-card");
    this.plantNames = page.locator(".card.product-card h5");
    this.cartCount = page.locator("#cart-count");
  }

  async searchPlant(plantName: string) {
    await this.searchInput.fill(plantName);
    await this.searchButton.click();
  }

  async clickLogout() {
    await this.logoutButton.click();
  }
  async clickFirstBuyNow() {
    await this.buyNowButtons.first().click();
  }
  async getCartCount(): Promise<number> {
    await this.cartCount.waitFor({ state: "visible" });
    const text = await this.cartCount.textContent();
    return Number(text?.trim());
  }
}
