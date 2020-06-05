const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
const faker = require('faker');
let client;
let picker;

describe("\n\nUi tests for my media mobile application images", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(10000);
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]")).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]")).click()
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    it("should show images inside the related folder in image screen", async function(){
        await(await client.$("~folderTab1")).click()
        client.pause(2000);
        await(await client.$("~5eca6940ae0b22214428c84f")).click()
        client.pause(2000);
        const visible = await(await client.$("~imageScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should not open image picker if permission to camera roll is not provided", async function(){
        await(await(client.$("~uploadImage"))).click()
        await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button[1]"))).click()
        const alert = await client.getAlertText()
        expect(alert).to.equal("Alert\nPermission to access camera roll is required!");
        client.acceptAlert();
    })

    it("should open image picker if permission to camera roll is not provided", async function(){
        await(await(client.$("~uploadImage"))).click()
        await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.Button[2]"))).click()
        picker = await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[1]")).isDisplayed()
        expect(picker).to.equal(true);
    })

    it("should upload the image successfully", async function(){
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout[1]")).click()
        const uploading = await(await client.$("~progressModal")).isDisplayed();
        expect(uploading).to.equal(true);
        await client.pause(20000);
    })

    it("should open the image", async function(){
        await(await client.$("~5eca6969ae0b22214428c850")).click();
        const visible = await(await client.$("~upModal")).isDisplayed();
        expect(visible).to.equal(true);
    })

    it("should open the details modal", async function(){
        await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[3]')).click();
        await client.pause(2000);
        const details = await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText();
        expect(details).to.equal("Details: ");
    })

    it("should show the details correctly", async function(){
        const name = await (await client.$('//android.view.ViewGroup[@content-desc="renameUnpressed"]/android.widget.TextView')).getText();
        const title = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[3]')).getText();
        const subject = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[5]')).getText();
        const artist = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[7]')).getText();
        const folder = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[9]')).getText();
        const user = await (await client.$("~5ec8c5671d51593d5831a514")).isDisplayed()
        expect(name).to.equal("IMG_0.3718826841940849.jpg")
        expect(title).to.equal("hirutele")
        expect(subject).to.equal("gh")
        expect(artist).to.equal("ftgyhujk")
        expect(folder).to.equal("Test")
        expect(user).to.equal(true);
    })

    it("should rename image successfully", async function(){
        const newname = faker.internet.userName()
        await (await client.$("~tooltipButton")).click();
        await (await client.$("~newname")).setValue(newname);
        await (await client.$("~renamebutton")).click();
        await client.pause(5000);
        const name = await (await client.$('//android.view.ViewGroup[@content-desc="renameUnpressed"]/android.widget.TextView')).getText()
        expect(name).to.equal(newname);
        await (await client.$("~tooltipButton")).click();
        await (await client.$("~newname")).setValue("IMG_0.3718826841940849.jpg");
        await (await client.$("~renamebutton")).click();
        await client.pause(2000)
    })

});
