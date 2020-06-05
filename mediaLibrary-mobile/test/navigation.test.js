const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;

describe("\n\nUi tests for my media mobile application navigation", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })

    it("should display home screen\n", async function() {
        const visible = await(await client.$("~home")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should navigate to all images screen from home screen\n", async function() {
        await(await client.$("~images")).click();
        await client.pause(2000);
        const visible = await(await client.$("~allImageScreen")).isDisplayed();
        expect(visible).to.equal(true);
        await client.back();
    });

    it("should navigate to all audio screen from home screen\n", async function() {
        await(await client.$("~audios")).click();
        await client.pause(2000);
        const visible = await(await client.$("~allAudioScreen")).isDisplayed();
        expect(visible).to.equal(true);
        await client.back();
    });

    it("should show logged user's email correctly in the drawer", async function(){
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]")).click()
        await client.pause(2000);
        const email = await (await client.$("~useremail")).getText()
        expect(email).to.equal("Test@gmail.com")
    })

    it("should navigate to all image screen from drawer\n", async function() {
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]")).click()
        await client.pause(10000);
        const visible = await(await client.$("~allImageScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    });

    it("should navigate to image folders tab", async function(){
        await(await client.$("~folderTab1")).click()
        client.pause(2000);
        const visible = await(await client.$("~folderScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to image search tab", async function(){
        await(await client.$("~searchTab1")).click()
        client.pause(2000);
        const visible = await(await client.$("~searchScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to image share tab", async function(){
        await(await client.$("~shareTab1")).click()
        client.pause(2000);
        const visible = await(await client.$("~shareScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to all audio screen from drawer\n", async function() {
        await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
        await client.pause(10000);
        const visible = await(await client.$("~allAudioScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    });

    it("should navigate to audio folders tab", async function(){
        await(await client.$("~folderTab2")).click()
        client.pause(2000);
        const visible = await(await client.$("~folderScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to audio search tab", async function(){
        await(await client.$("~searchTab2")).click()
        client.pause(2000);
        const visible = await(await client.$("~searchScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to audio share tab", async function(){
        await(await client.$("~shareTab2")).click()
        client.pause(2000);
        const visible = await(await client.$("~shareScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to all video screen from drawer\n", async function() {
        await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
        await client.pause(10000);
        const visible = await(await client.$("~allVideoScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    });

    it("should navigate to video folders tab", async function(){
        await(await client.$("~foldertab")).click()
        client.pause(2000);
        const visible = await(await client.$("~folderScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to video search tab", async function(){
        await(await client.$("~searchTab")).click()
        client.pause(2000);
        const visible = await(await client.$("~searchScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to video share tab", async function(){
        await(await client.$("~shareTab")).click()
        client.pause(2000);
        const visible = await(await client.$("~shareScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should navigate to favourites screen from drawer\n", async function() {
        await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
        await client.pause(10000);
        const visible = await(await client.$("~favouriteScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    });

    it("should logout from the drawer successfully\n", async function() {
        await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[6]")).click()
        await client.pause(10000);
        const visible = await(await client.$("~loginscreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    });

})