const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;

describe("\n\nUi tests for my media mobile application login", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    it("should display login screen\n", async function() {
        const visible = await(await client.$("~loginscreen")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("shoud give error messages if email and password are not entered\n", async function(){
        const submit = await client.$("~submit")
        await submit.click();
        const emailErr = await (await client.$("~emailError")).getText();
        const passwordErr = await (await client.$("~passwordError")).getText();
        expect(emailErr).to.equal("email is a required field");
        expect(passwordErr).to.equal("password is a required field");
    })

    it("shoud give error messages if email and password are not matched\n", async function(){
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("12345")
        await(await client.$("~submit")).click();
        const alert = await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.TextView")).getText()
        expect(alert).to.equal("Email or password is incorrect");
        const visible = await(await client.$("~loginscreen")).isDisplayed();
        expect(visible).to.equal(false);
    })

    it("shoud remove alert when ok is pressed\n", async function(){
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button")).click()
        const visible = await(await client.$("~loginscreen")).isDisplayed();
        expect(visible).to.equal(true);
    })

    it("shoud login successfully if email and password are matched\n", async function(){
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(2000);
        const visible = await(await client.$("~home")).isDisplayed();
        expect(visible).to.equal(true);
    })
});
