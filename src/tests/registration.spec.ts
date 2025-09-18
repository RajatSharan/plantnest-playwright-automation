import { test, expect, Page } from '@playwright/test';
import { registerPage } from '../pages/register-page'; 
import { LoginPage } from '../pages/login-page'
import { BASE_URL } from '../constants/constants';
import {getTestData} from '../utils/testdatareader'
import { faker } from '@faker-js/faker';

const pageUrl = getTestData("baseURL",BASE_URL);
test.describe('User Registration', () => {

  let register: registerPage;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    const loginpage = new LoginPage(page);
    register = new registerPage(page);
    await page.goto(pageUrl);
    await loginpage.clickONSignUP()
  });

  test('should allow a new user to register successfully', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userName = faker.internet.userName({ firstName, lastName });
    const email = faker.internet.email({ firstName, lastName });
    const phoneNumber = faker.helpers.fromRegExp(/(91)[0-9]{10}/); 
    const address = faker.location.streetAddress();
    const password = 'Admin@123';

    await register.register(
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      address,
      password,
      password
    );
    await register.clickontermsandconditionCheckbox()
    await register.clickONRegister()
    //await expect(page.locator('.success-message')).toBeVisible();
  });
});