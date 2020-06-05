const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
const faker = require('faker');
let client;
let picker;

describe("\n\nUi tests for my media mobile application functions related to audios", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(10000);
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]")).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    it("should show videos inside the related folder in video screen", async function(){
        await(await client.$("~foldertab")).click()
        await client.pause(2000);
        await(await client.$("~5eca6e5cae0b22214428c853")).click()
        await client.pause(3000);
        const visible = await(await client.$("~videoScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should open document picker for videos", async function(){
        await(await(client.$("~uploadVideo"))).click()
        await(await(client.$("~Show roots"))).click()
        await client.pause(1000)
        const txt = await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout[2]/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.TextView"))).getText()
        expect(txt).to.equal('Videos');
        await client.back()
    })

    // it("should upload the vieo successfully", async function(){
    //     await(await(client.$("~uploadVideo"))).click()
    //     await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ImageView[1]"))).click()
    //     const uploading = await(await client.$("~progressModal")).isDisplayed();
    //     expect(uploading).to.equal(true);
    //     await client.pause(130000);
    // })

    it("should open the video", async function(){
        await client.pause(2000);
        await(await client.$("~5eca6e6dae0b22214428c854")).click();
        const visible = await(await client.$("~videoModal")).isDisplayed();
        expect(visible).to.equal(true);
    })

    it("should open the details modal of the audio", async function(){
        await(await client.$('~detailsModalV')).click();
        await client.pause(2000);
        const details = await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText();
        expect(details).to.equal("Details: ");
    })

    it("should show the details of the audio correctly", async function(){
        const name = await (await client.$('//android.view.ViewGroup[@content-desc="renameUnpressed"]/android.widget.TextView')).getText();
        const title = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[3]')).getText();
        const artist = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[5]')).getText();
        const user = await (await client.$("~5ec8c5671d51593d5831a514")).isDisplayed()
        expect(name).to.equal("VID-20200522-WA0000.mp4")
        expect(title).to.equal("Untitled")
        expect(artist).to.equal("Unknown artist")
        expect(user).to.equal(true);
    })

    it("should rename audio successfully", async function(){
        const newname = faker.internet.userName()
        await (await client.$("~tooltipButton")).click();
        await (await client.$("~newname")).setValue(newname);
        await (await client.$("~renamebutton")).click();
        await client.pause(5000);
        const name = await (await client.$('//android.view.ViewGroup[@content-desc="renameUnpressed"]/android.widget.TextView')).getText()
        expect(name).to.equal(newname);
        await (await client.$("~tooltipButton")).click();
        await (await client.$("~newname")).setValue("VID-20200522-WA0000.mp4");
        await (await client.$("~renamebutton")).click();
        await client.pause(2000)
    })

});
