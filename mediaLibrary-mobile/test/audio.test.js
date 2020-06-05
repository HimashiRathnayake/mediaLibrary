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
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    it("should show audios inside the related folder in audio screen", async function(){
        await(await client.$("~folderTab2")).click()
        await client.pause(2000);
        await(await client.$("~5eca6d73ae0b22214428c851")).click()
        await client.pause(3000);
        const visible = await(await client.$("~audioScreen")).isDisplayed(); 
        expect(visible).to.equal(true);
    })

    it("should open document picker for audios", async function(){
        await(await(client.$("~uploadAudio"))).click()
        await(await(client.$("~Show roots"))).click()
        await client.pause(1000)
        const txt = await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout[2]/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.TextView"))).getText()
        expect(txt).to.equal('Audio');
        await client.back()
        await client.back()
        await client.back()
    })

    // it("should upload the audio successfully", async function(){
    //     await(await(client.$("~uploadAudio"))).click()
    //     await(await(client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.support.v4.widget.DrawerLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v7.widget.RecyclerView/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.ImageView[1]"))).click()
    //     const uploading = await(await client.$("~progressModal")).isDisplayed();
    //     expect(uploading).to.equal(true);
    //     await client.pause(130000);
    // })

    it("should open the audio", async function(){
        await client.pause(2000);
        await(await client.$("~5ecb6a681ca25620e4d23fda")).click();
        const visible = await(await client.$("~audioModal")).isDisplayed();
        expect(visible).to.equal(true);
    })

    it("should open the details modal of the audio", async function(){
        await(await client.$('~showDetails')).click();
        await client.pause(2000);
        const details = await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText();
        expect(details).to.equal("Details: ");
    })

    it("should show the details of the audio correctly", async function(){
        const name = await (await client.$('//android.view.ViewGroup[@content-desc="renameUnpressed"]/android.widget.TextView')).getText();
        const title = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[3]')).getText();
        const album = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[5]')).getText();
        const artist = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[7]')).getText();
        const year = await (await client.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView[9]')).getText();
        const user = await (await client.$("~5ec8c5671d51593d5831a514")).isDisplayed()
        expect(name).to.equal("Give Life Back To Music")
        expect(title).to.equal("Give Life Back To Music")
        expect(album).to.equal("Random Access Memories")
        expect(artist).to.equal("Daft Punk")
        expect(year).to.equal("2013")
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
        await (await client.$("~newname")).setValue("Give Life Back To Music");
        await (await client.$("~renamebutton")).click();
        await client.pause(2000)
    })

});
