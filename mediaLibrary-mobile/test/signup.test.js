const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;
const faker = require("faker");

describe("\n\nUi tests for my media mobile application signup", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
    });
    
    after(async function() {
        await client.deleteSession();
    })

    it("shoud navigate into signup screen if create account pressed\n", async function(){
        await(await client.$("~signup")).click();
        const visible = await(await client.$("~signupscreen")).isDisplayed();
        expect(visible).to.equal(true);
    })

    it("shoud give error messages in the signup screen if email, password, confirm password are empty\n", async function(){
        await(await client.$('~submit1')).click();
        client.pause(2000);
        const emailErr = await(await client.$("~emailErr1")).getText()
        const passwordErr = await(await client.$("~passwordErr1")).getText()
        const confirmPErr = await(await client.$("~confirmPErr1")).getText()
        expect(emailErr).to.equal("email is a required field");
        expect(passwordErr).to.equal("password is a required field");
        expect(confirmPErr).to.equal("confirmPassword is a required field");
    }) 

    it("shoud not signup if password and confirm password are not matched\n", async function(){
        await(await client.$("~email1")).setValue("TestUI@gmail.com")
        await(await client.$("~password1")).setValue("TestUI")
        await(await client.$("~confirmP1")).setValue("TestUI1")
        await(await client.$("~submit1")).click();
        const confirmPErr = await(await client.$("~confirmPErr1")).getText()
        expect(confirmPErr).equal("Password doesn't match");
    })

    it("should not signup if email already exists", async function(){
        await(await client.$("~email1")).setValue("Test@gmail.com")
        await(await client.$("~password1")).setValue("TestUI")
        await(await client.$("~confirmP1")).setValue("TestUI")
        await(await client.$("~submit1")).click();
        const alert = await client.getAlertText();
        expect(alert).to.equal("Alert\nEmail already exists. Try with different email")
        client.dismissAlert()
    })

    it("should signup successfully and show app intro slider if email, password and confirm password are OK", async function(){
        await(await client.$("~email1")).setValue(faker.internet.email())
        await(await client.$("~password1")).setValue("TestUI")
        await(await client.$("~confirmP1")).setValue("TestUI")
        await(await client.$("~submit1")).click();
        await client.pause(2000)
        const appIntro = await(await client.$("~appIntro")).isDisplayed()
        expect(appIntro).to.equal(true);
    })

});