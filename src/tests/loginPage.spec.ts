import {test,expect} from '@playwright/test'
import { BASE_URL } from '../constants/constants'
import { LoginPage } from '../pages/login-page'
import { LOGIN_DATA_PATH } from '../constants/constants'
import {getJsonArray,getTestData} from '../utils/testdatareader'

const logindata = getJsonArray("loginData", LOGIN_DATA_PATH);
const pageUrl = getTestData("baseURL",BASE_URL);

test.describe("User Authentication", () => {
  for (const data of logindata) {
    test(`Login scenario: ${data.scenario}`, async ({ page }) => {
      const loginpage = new LoginPage(page);
      await loginpage.navigateTo(pageUrl);
      await loginpage.login(data.username, data.password);
     await loginpage.clickONSignIN();

     if(data.shouldSucceed){
         await expect(page).toHaveURL(new RegExp(`${data.expectedUrl}`))
     }
     else{
        await expect(page.locator(".alert.alert-danger.form-group-animated")).toHaveText(data.expectedError);
     }
    });
  }
});

test("To verifiy that user is able to redirect on signup page",async({page})=>{
 
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo(pageUrl)
  await loginpage.clickONSignUP()
})

test("To verifiy that user is able to redirect on forgot password",async({page})=>{
 
  const loginpage = new LoginPage(page);
  await loginpage.navigateTo(pageUrl)
  await loginpage.clickONForgotPassword()
})
