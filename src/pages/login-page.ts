import {Page} from '@playwright/test'
import { Logger } from '../loggers/customLogger'
export class LoginPage{

    readonly page:Page
    readonly usernameInput ="#username"
    readonly passwordInput ="#password"
    readonly signInButton="#signInButton"



    constructor(page:Page){
        this.page=page
    }

    async navigateTo(url:string){
        Logger.info(`Navigating to ${url}`);
        await this.page.goto(url)
    }

    async login(username:string,password:string){

         Logger.info(`Entering username: ${username}`)
        await this.page.fill(this.usernameInput,username)
         Logger.info(`Entering password`);
        await this.page.fill(this.passwordInput,password)
    }
    async clickONSignIN(){
        Logger.info("Clicking on Sign In button");
        await this.page.click(this.signInButton)
    }

}