import { test,expect} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BASE_URL,LOGIN_DATA_PATH } from '../constants/constants'
import {getTestData,getJsonArray} from '../utils/testdatareader'
import { ForgotPage } from '../pages/forgot-page';


const pageUrl = getTestData("baseURL",BASE_URL);
test('Verfiy the Forgot password page',async({page})=>{

    const loginPage = new LoginPage(page)
    const forgotPage= new ForgotPage(page)
    const logindata = getJsonArray("loginData", LOGIN_DATA_PATH);

    await loginPage.navigateTo(pageUrl)
    await loginPage.clickONForgotPassword()
    await forgotPage.EnterEmail(logindata[0].username)
    await forgotPage.resetPasswordButton()
    await forgotPage.isSuccessMessageVisible()

})


test('Validate after incorrect email address',async({page})=>{

    const loginPage = new LoginPage(page)
    const forgotPage= new ForgotPage(page)

    await loginPage.navigateTo(pageUrl)
    await loginPage.clickONForgotPassword()
    await forgotPage.EnterEmail("dadasdas")
    await forgotPage.resetPasswordButton()
    await expect(forgotPage.emailAddress).toHaveJSProperty(
    'validationMessage',
    "Please include an '@' in the email address. 'dadasdas' is missing an '@'."
);

})

test('Validate Back to login Link',async({page})=>{

    const loginPage = new LoginPage(page)
    const forgotPage= new ForgotPage(page)
    await loginPage.navigateTo(pageUrl)
    await loginPage.clickONForgotPassword()
    await forgotPage.clickonBackToLogin()

})

