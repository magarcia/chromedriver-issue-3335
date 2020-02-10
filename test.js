require("chromedriver");
const { Builder, By, until } = require("selenium-webdriver");

var driver;

describe("issue-3335", () => {
  beforeAll(async () => {
    driver = new Builder().forBrowser("chrome").build();
    console.log(await driver.getCapabilities());
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("should keep interactivity after destroy the iframe", async () => {
    await driver.get("http://127.0.0.1:8080");

    var frame = driver.findElement(By.id("childframe"));

    await driver.sleep(500);

    // Switch to child iframe
    await driver.switchTo().frame(frame);

    // Click destroy iframe button
    var button = await driver.findElement(By.id("destroy-iframe-btn"));
    await button.click();
    await driver.sleep(500);

    // Click change message button
    var button2 = await driver.findElement(By.id("change-message-btn"));
    await button2.click();
    await driver.sleep(500);

    //  Check if message got updated
    var message = await driver.findElement(By.id("message"));
    var text = await message.getText();

    expect(text).toEqual("Button updated message");
  });
});
