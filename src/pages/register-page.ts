    import {Page} from '@playwright/test'
    import { Logger } from '../loggers/customLogger'
    export class registerPage{

        readonly page:Page
        readonly firstNameInput ="#firstName"
        readonly lastNameInput ="#lastName"
        readonly userNameInput = "#username"
        readonly emailInput ="#email"
        readonly phoneNumberInput ="#phoneNumber"
        readonly addressInput ="#address"
        readonly passwordInput ="#password"
        readonly confirmPasswordInput ="#confirmPassword"
        readonly termsandconditionCheckbox ="#terms"
        readonly registerButton = "button[type='submit']"

        constructor(page:Page){
            this.page=page
        }

        async register(firstName:string,lastName:string,userName:string,email:string,phoneNumber:string,address:string,password:string,confirmPassword:string){

            await this.page.fill(this.firstNameInput,firstName)
            await this.page.fill(this.lastNameInput,lastName)
            await this.page.fill(this.userNameInput,userName)
            await this.page.fill(this.emailInput,email)
            await this.page.fill(this.phoneNumberInput,phoneNumber)
            await this.page.fill(this.addressInput,address)
            await this.page.fill(this.passwordInput,password)
            await this.page.fill(this.confirmPasswordInput,confirmPassword)
        }
        async clickontermsandconditionCheckbox(){
            Logger.info("Clicking on Sign In button");
            await this.page.click(this.termsandconditionCheckbox)
        }
        async clickONRegister(){
            await this.page.click(this.registerButton)
        }

    }