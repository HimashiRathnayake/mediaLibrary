const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;

describe("\n\nUi tests for my media mobile application share functions", function() {

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
    
    describe("\nUi tests for image share functions", function() {

        it("should open share modal for image", async function(){
            await(await(client.$("~5eca6969ae0b22214428c850"))).click()
            await client.pause(1000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[3]')).click();
            await client.pause(1000);
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            const txt = await (await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText()
            expect(txt).to.equal("Share ")
        })

        it("should give correct search results for given text", async function(){
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(1000)
            const user = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()
            const email = await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup/android.widget.TextView[2]')).getText()
            expect(user).to.equal(true);
            expect(email).to.equal("Test1@gmail.com")
        })

        it("should share image with the user with given email successfully", async function(){
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should not share same image with same user twice", async function(){
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(2000);
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(3000);
            const alert = await client.getAlertText();
            expect(alert).to.equal("Alert\nAlready Shared");
            await client.dismissAlert();
        })

        it("should update the share screen for images after sharing the image", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab1")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5eca6969ae0b22214428c850")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should remove the user from the image with given email successfully", async function(){
            await (await client.$("~imageTab")).click();
            await client.pause(3000);
            await (await client.$("~5eca6969ae0b22214428c850")).click()
            await client.pause(2000);
            await(await client.$('(//android.view.ViewGroup[@content-desc="tooltipButton"])[3]')).click();
            await client.pause(1000);
            await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup')).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(false)
        })

        it("should update the share screen for images after removing a user", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab1")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5eca6969ae0b22214428c850")).isDisplayed()    
            expect(visible).to.equal(false)
        })

    })

    describe("\nUi tests for audio share functions", function() {

        it("should open share modal for audio", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
            await client.pause(1000);
            await(await(client.$("~5ecb6a681ca25620e4d23fda"))).click()
            await client.pause(1000);
            await(await client.$('~showDetails')).click();
            await client.pause(1000);
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            const txt = await (await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText()
            expect(txt).to.equal("Share ")
        })

        it("should give correct search results for given text", async function(){
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(1000)
            const user = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()
            const email = await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup/android.widget.TextView[2]')).getText()
            expect(user).to.equal(true);
            expect(email).to.equal("Test1@gmail.com")
        })

        it("should share audio with the user with given email successfully", async function(){
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should not share same audio with same user twice", async function(){
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(2000);
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(3000);
            const alert = await client.getAlertText();
            expect(alert).to.equal("Alert\nAlready Shared");
            await client.dismissAlert();
        })

        it("should update the share screen for audios after sharing the audio", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab2")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5ecb6a681ca25620e4d23fda")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should remove the user from the audio with given email successfully", async function(){
            await (await client.$("~audioTab")).click();
            await client.pause(3000);
            await (await client.$("~5ecb6a681ca25620e4d23fda")).click()
            await client.pause(2000);
            await(await client.$('~showDetails')).click();
            await client.pause(1000);
            await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup')).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(false)
        })

        it("should update the share screen for audios after removing a user", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab2")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5ecb6a681ca25620e4d23fda")).isDisplayed()    
            expect(visible).to.equal(false)
        })

    })

    describe("\nUi tests for video share functions", function() {

        it("should open share modal for video", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
            await client.pause(1000);
            await(await(client.$("~5eca6e6dae0b22214428c854"))).click()
            await client.pause(1000);
            await(await client.$('~detailsModalV')).click();
            await client.pause(1000);
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            const txt = await (await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView")).getText()
            expect(txt).to.equal("Share ")
        })

        it("should give correct search results for given text", async function(){
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(1000)
            const user = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()
            const email = await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup/android.widget.TextView[2]')).getText()
            expect(user).to.equal(true);
            expect(email).to.equal("Test1@gmail.com")
        })

        it("should share video with the user with given email successfully", async function(){
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should not share same video with same user twice", async function(){
            await (await client.$("~shareModalVisible")).click()
            await client.pause(1000);
            await (await client.$("~user")).setValue("Test1@gmail.com")
            await client.pause(2000);
            await (await client.$("~5e9dbdc97b575d20d83188c7")).click() 
            await client.pause(3000);
            const alert = await client.getAlertText();
            expect(alert).to.equal("Alert\nAlready Shared");
            await client.dismissAlert();
        })

        it("should update the share screen for videos after sharing the video", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5eca6e6dae0b22214428c854")).isDisplayed()    
            expect(visible).to.equal(true)
        })

        it("should remove the user from the video with given email successfully", async function(){
            await (await client.$("~videotab")).click();
            await client.pause(3000);
            await (await client.$("~5eca6e6dae0b22214428c854")).click()
            await client.pause(2000);
            await(await client.$('~detailsModalV')).click();
            await client.pause(1000);
            await (await client.$('//android.view.ViewGroup[@content-desc="5e9dbdc97b575d20d83188c7"]/android.view.ViewGroup')).click() 
            await client.pause(2000)
            const visible = await (await client.$("~5e9dbdc97b575d20d83188c7")).isDisplayed()    
            expect(visible).to.equal(false)
        })

        it("should update the share screen for videos after removing a user", async function(){
            await client.back();
            await client.back();
            await (await client.$("~shareTab")).click();
            await client.pause(4000);
            const visible = await (await client.$("~5eca6e6dae0b22214428c854")).isDisplayed()    
            expect(visible).to.equal(false)
        })

    })

});
