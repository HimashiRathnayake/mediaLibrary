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
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[2]")).click()
        await client.pause(10000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })

    describe("\nUI tests for image search functions", function() {
    
        it("Search images screen", async function(){
            await(await client.$("~searchTab1")).click()
            await client.pause(2000);
            const header = await(await client.$("~headerText")).getText()
            expect(header).to.equal("Search Images");
        })

        it("should give search results if exists when search images by title only", async function(){
            await(await(client.$("~title"))).setValue("hirutele")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by title only", async function(){
            await(await(client.$("~title"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search images by subject only", async function(){
            await(await(client.$("~subject"))).setValue("gh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by subject only", async function(){
            await(await(client.$("~subject"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        }) 
        
        it("should give search results if exists when search images by artist only", async function(){
            await(await(client.$("~artist"))).setValue("ftgyhujk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by artist only", async function(){
            await(await(client.$("~artist"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search images by title and subject only", async function(){
            await(await(client.$("~title"))).setValue("hirutele")
            await(await(client.$("~subject"))).setValue("gh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by title and subject only", async function(){
            await(await(client.$("~title"))).setValue("gggggg")
            await(await(client.$("~subject"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search images by title and artist only", async function(){
            await(await(client.$("~title"))).setValue("hirutele")
            await(await(client.$("~artist"))).setValue("ftgyhujk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by title and artist only", async function(){
            await(await(client.$("~title"))).setValue("gggggg")
            await(await(client.$("~artist"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search images by subject and artist only", async function(){
            await(await(client.$("~subject"))).setValue("gh")
            await(await(client.$("~artist"))).setValue("ftgyhujk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by subject and artist only", async function(){
            await(await(client.$("~subject"))).setValue("gggggg")
            await(await(client.$("~artist"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search images by title, subject and artist only", async function(){
            await(await(client.$("~title"))).setValue("hirutele")
            await(await(client.$("~subject"))).setValue("gh")
            await(await(client.$("~artist"))).setValue("ftgyhujk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5eca6969ae0b22214428c850"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no images found if images doesn't exists when search by title, subject and artist only", async function(){
            await(await(client.$("~title"))).setValue("gggggg")
            await(await(client.$("~subject"))).setValue("gggggg")
            await(await(client.$("~artist"))).setValue("ggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noImage1"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })
    
    })

    describe("\nUI tests for audio search functions", function() {
        
        it("Search audios screen", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[3]")).click()
            await client.pause(1000);
            await(await client.$("~searchTab2")).click()
            await client.pause(2000);
            const header = await(await client.$("~headerText")).getText()
            expect(header).to.equal("Search Audios");
        })

        it("should give search results if exists when search audios by title only", async function(){
            await(await(client.$("~title"))).setValue("Give Life Back To Music")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by title only", async function(){
            await(await(client.$("~title"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by album only", async function(){
            await(await(client.$("~album"))).setValue("Random Access Memories")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by album only", async function(){
            await(await(client.$("~album"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by artist only", async function(){
            await(await(client.$("~artist"))).setValue("Daft Punk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by artist only", async function(){
            await(await(client.$("~artist"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by year only", async function(){
            await(await(client.$("~year"))).setValue("2013")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by artist only", async function(){
            await(await(client.$("~year"))).setValue("1000")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by title and album only", async function(){
            await(await(client.$("~title"))).setValue("Give Life Back To Music")
            await(await(client.$("~album"))).setValue("Random Access Memories")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by title and album only", async function(){
            await(await(client.$("~title"))).setValue("gggggggg")
            await(await(client.$("~album"))).setValue("gggggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by title and artist only", async function(){
            await(await(client.$("~title"))).setValue("Give Life Back To Music")
            await(await(client.$("~artist"))).setValue("Daft Punk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by title and artist only", async function(){
            await(await(client.$("~title"))).setValue("gggggggg")
            await(await(client.$("~artist"))).setValue("gggggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by title and year only", async function(){
            await(await(client.$("~title"))).setValue("Give Life Back To Music")
            await(await(client.$("~year"))).setValue("2013")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by title and year only", async function(){
            await(await(client.$("~title"))).setValue("gggggggg")
            await(await(client.$("~year"))).setValue("1900")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by album and artist only", async function(){
            await(await(client.$("~album"))).setValue("Random Access Memories")
            await(await(client.$("~artist"))).setValue("Daft Punk")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by album and artist only", async function(){
            await(await(client.$("~album"))).setValue("gggggggg")
            await(await(client.$("~artist"))).setValue("gggggggg")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by album and year only", async function(){
            await(await(client.$("~album"))).setValue("Random Access Memories")
            await(await(client.$("~year"))).setValue("2013")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by album and year only", async function(){
            await(await(client.$("~album"))).setValue("gggggggg")
            await(await(client.$("~year"))).setValue("1900")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by artist and year only", async function(){
            await(await(client.$("~artist"))).setValue("Daft Punk")
            await(await(client.$("~year"))).setValue("2013")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by artist and year only", async function(){
            await(await(client.$("~artist"))).setValue("gggggggg")
            await(await(client.$("~year"))).setValue("1900")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search audios by title, artist, album and year only", async function(){
            await(await(client.$("~title"))).setValue("Give Life Back To Music")
            await(await(client.$("~album"))).setValue("Random Access Memories")
            await(await(client.$("~artist"))).setValue("Daft Punk")
            await(await(client.$("~year"))).setValue("2013")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~5ecb6a681ca25620e4d23fda"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

        it("should give no audios found if audios doesn't exists when search by title, artist, album and year only", async function(){
            await(await(client.$("~title"))).setValue("ggggggg")
            await(await(client.$("~album"))).setValue("ggggggg")
            await(await(client.$("~artist"))).setValue("gggggggg")
            await(await(client.$("~year"))).setValue("1900")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const img = await(await(client.$("~noAudio"))).isDisplayed()
            expect(img).to.equal(true);
            await client.back();
        })

    })

    describe("\nUI tests for audio search functions", function() {

        it("Search videos screen", async function(){
            await(await client.$('//android.view.ViewGroup[@content-desc="header"]/android.view.ViewGroup')).click()
            await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup[4]")).click()
            await client.pause(1000);
            await(await client.$("~searchTab")).click()
            await client.pause(2000);
            const header = await(await client.$("~headerText")).getText()
            expect(header).to.equal("Search Videos");
        })

        it("should give search results if exists when search videos by title only", async function(){
            await(await(client.$("~title"))).setValue("Untitled")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~5eca6e6dae0b22214428c854"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

        it("should give no videos found if videos doesn't exists when search by title only", async function(){
            await(await(client.$("~title"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~noAudiosFound"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search videos by artist only", async function(){
            await(await(client.$("~artist"))).setValue("Unknown artist")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~5eca6e6dae0b22214428c854"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

        it("should give no videos found if videos doesn't exists when search by artist only", async function(){
            await(await(client.$("~artist"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~noAudiosFound"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

        it("should give search results if exists when search videos by title and artist only", async function(){
            await(await(client.$("~title"))).setValue("Untitled")
            await(await(client.$("~artist"))).setValue("Unknown artist")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~5eca6e6dae0b22214428c854"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

        it("should give no videos found if videos doesn't exists when search by title only", async function(){
            await(await(client.$("~title"))).setValue("hhhhh")
            await(await(client.$("~artist"))).setValue("hhhhh")
            await(await(client.$("~search"))).click()
            await client.pause(2000)
            const video = await(await(client.$("~noAudiosFound"))).isDisplayed()
            expect(video).to.equal(true);
            await client.back();
        })

    })

});
