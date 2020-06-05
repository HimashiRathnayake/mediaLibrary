const wdio = require("webdriverio");
const opts = require('./config.test');
const expect = require('chai').expect;
let client;

describe("\n\nUi tests for my media mobile application home and overall search", function() {

    before(async function() {
        client = await wdio.remote(opts);
        await client.pause(5000);
        await(await client.$("~email")).setValue("Test@gmail.com")
        await(await client.$("~password")).setValue("Test123")
        await(await client.$("~submit")).click();
        await client.pause(2000);
    });
    
    after(async function() {
        await client.deleteSession();
        await client.pause(2000);
    })
    
    it("should display home screen\n", async function() {
        const visible = await(await client.$("~home")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should navigate to all overall search\n", async function() {
        await(await client.$("~search")).click();
        await client.pause(2000);
        const visible = await(await client.$("~homeSearch")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search images by title\n", async function() {
        await(await client.$("~searchhometext")).setValue('h');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6969ae0b22214428c850")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search images by title\n", async function() {
        await(await client.$("~searchhometext")).setValue('hl');
        await client.pause(5000);
        const visible = await(await client.$("~noImage1")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search audios by title\n", async function() {
        await(await client.$("~selectAudio")).click();
        await(await client.$("~searchhometext")).setValue('give');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6e00ae0b22214428c852")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search audios by title\n", async function() {
        await(await client.$("~searchhometext")).setValue('givenn');
        await client.pause(5000);
        const visible = await(await client.$("~noAudio")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search videos by title\n", async function() {
        await(await client.$("~selectVideo")).click();
        await(await client.$("~searchhometext")).setValue('Untitled');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6e6dae0b22214428c854")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search videos by title\n", async function() {
        await(await client.$("~searchhometext")).setValue('givenn');
        await client.pause(5000);
        const visible = await(await client.$("~noAudiosFound")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search images by artist\n", async function() {
        await(await client.$("~selectImage")).click();
        await(await client.$("~picker")).click();
        await(await client.$("/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.CheckedTextView[2]")).click();
        await client.pause(2000);
        await(await client.$("~searchhometext")).setValue('f');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6969ae0b22214428c850")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search images by artist\n", async function() {
        await(await client.$("~searchhometext")).setValue('fh');
        await client.pause(5000);
        const visible = await(await client.$("~noImage1")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search audios by artist\n", async function() {
        await(await client.$("~selectAudio")).click();
        await(await client.$("~searchhometext")).setValue('daft');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6e00ae0b22214428c852")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search audios by artist\n", async function() {
        await(await client.$("~searchhometext")).setValue('dafttt');
        await client.pause(5000);
        const visible = await(await client.$("~noAudio")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give correct results if matching results exists when search videos by artist\n", async function() {
        await(await client.$("~selectVideo")).click();
        await(await client.$("~searchhometext")).setValue('un');
        await client.pause(5000);
        const visible = await(await client.$("~5eca6e6dae0b22214428c854")).isDisplayed();
        expect(visible).to.equal(true);
    });

    it("should give no images found if matching results doesn't exist when search videos by artist\n", async function() {
        await(await client.$("~searchhometext")).setValue('unnn');
        await client.pause(5000);
        const visible = await(await client.$("~noAudiosFound")).isDisplayed();
        expect(visible).to.equal(true);
    });

});
