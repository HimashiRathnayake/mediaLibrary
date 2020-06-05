const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;

describe("\n\nUi tests for my media mobile application favourite functions", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(2000);
        await client.pause(10000);
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]")).click()
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]")).click()
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    describe("\nUi tests for image favourite functions", function() {

        it("should add the image to favourites and update favourite screen for images", async function(){
            await(await(client.$("~5eca6969ae0b22214428c850"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(2000);
            const visible = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(visible).to.equal(true)
        })

        it("should remove the image from favourites and update favourite screen for images", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]")).click()
            await client.pause(2000);
            await(await(client.$("~5eca6969ae0b22214428c850"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(2000);
            const visible = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(visible).to.equal(false)
        })

    })

    describe("\nUi tests for audio favourite functions", function() {

        it("should add the audio to favourites and update favourite screen for audios", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
            await client.pause(2000);
            await(await(client.$("~5ecb6a681ca25620e4d23fda"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(1000);
            await(await client.$('~audioFavourite')).click()
            await client.pause(2000);
            const visible = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(visible).to.equal(true)
        })

        it("should remove the audio from favourites and update favourite screen for audios", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
            await client.pause(2000);
            await(await(client.$("~5ecb6a681ca25620e4d23fda"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(2000);
            const visible = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(visible).to.equal(false)
        })
        
    })

    describe("\nUi tests for video favourite functions", function() {

        it("should add the video to favourites and update favourite screen for videos", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
            await client.pause(2000);
            await(await(client.$("~5eca6e6dae0b22214428c854"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(1000);
            await(await client.$('~videoFavourite')).click()
            await client.pause(3000);
            const visible = await(await(client.$("~5eca6e6dae0b22214428c854"))).isDisplayed()
            expect(visible).to.equal(true)
        })

        it("should remove the image from favourites and update favourite screen for images", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
            await client.pause(2000);
            await(await(client.$("~5eca6e6dae0b22214428c854"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[1]')).click();
            await client.pause(3000);
            await client.back();
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[5]")).click()
            await client.pause(2000);
            const visible = await(await(client.$("~5eca6e6dae0b22214428c854"))).isDisplayed()
            expect(visible).to.equal(false)
        })
        
    })

});
