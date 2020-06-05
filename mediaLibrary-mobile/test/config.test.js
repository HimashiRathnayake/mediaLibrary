const wdio = require("webdriverio");

const opts = {
    port: 4723,
    path: '/wd/hub',
    capabilities: {
        platformName: "Android",
        deviceName: "5200c44bfe2e456d",
        app: "D:/My Work/Node.js/mediaLibrary/mediaLibrary-mobile/test/mediaLibrary-mobile-c9207ed9d6354e0db5d14e9cd799db7e-signed.apk",
        automationName: "UiAutomator2",
        appWaitForLaunch: false
    }
};

module.exports = opts;