import {Page,expect} from '@playwright/test'

export class ForgotPage{

    readonly page:Page
    readonly emailAddress
    readonly submitButton 
    readonly backToLogin 
    readonly successMessage


    constructor(page:Page){

        this.page=page
        this.emailAddress = page.locator('#email');
        this.submitButton = page.locator('#resetPasswordBtn');
        this.backToLogin = page.locator("a[href='/login']");
        this.successMessage= page.getByText("If an account exists, a password reset link has been sent.")
        

    }

    async EnterEmail(username:string){

        await this.emailAddress.fill(username);
    }

    async resetPasswordButton(){

          await this.submitButton.click();
    }

    async clickonBackToLogin(){
        await this.backToLogin.click()
    }

    async isSuccessMessageVisible(){
       await expect(this.successMessage).toBeVisible();
    }
}