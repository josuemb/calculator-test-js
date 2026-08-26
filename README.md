# calculator-test-js

End-to-end (E2E) testing of an Android app — a calculator — driven with
[Appium](http://appium.io/), [WebdriverIO](https://webdriver.io/) and
[Mocha](https://mochajs.org/), written in
[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
Tests run either **locally** (emulator or a physical device) or in the cloud on
[AWS Device Farm](https://aws.amazon.com/device-farm/) against real devices.

> TypeScript version: https://github.com/josuemb/calculator-test-ts

## How it works

The suite installs the calculator **APK** on a device, opens it, performs simple
arithmetic, and asserts the on-screen result — all **without the app's source
code**, showing that black-box E2E testing needs only the APK. Tests are organized
with the [Page Object Pattern](https://webdriver.io/docs/pageobjects/): UI details
live in `test/pageobjects/`, and the specs in `test/specs/test.e2e.js` read as
plain behavior ("sum 1 + 2 → 3").

## Architecture

Communication flows from the test code down to the device:

```
Mocha (test runner, BDD specs)
  → WebdriverIO (WebDriver client)
    → Appium 2.x server (HTTP, WebDriver protocol)
      → UiAutomator2 driver
        → Android device (emulator, physical phone, or Device Farm)
```

| Component | Role |
|---|---|
| [Mocha](https://mochajs.org/) | Test framework — BDD `describe/it`, `before/after` hooks, async/await. |
| [WebdriverIO](https://webdriver.io/) | WebDriver client that talks to Appium; hosts the Page Objects. |
| [Node.js](https://nodejs.org/) | JavaScript runtime that executes the tests locally and on Device Farm. |
| [Appium 2.x](http://appium.io/) | UI-automation server bridging the tests and the device. |
| [UiAutomator2 driver](https://github.com/appium/appium-uiautomator2-driver) | Executes the actions on Android. |
| [AWS Device Farm](https://aws.amazon.com/device-farm/) | Optional cloud grid of real devices. |

This project targets **Node.js 18.x** and **Appium 2.x**, and uses Device Farm's
**custom test environment** (defined in
[`aws-device-farm-config/awsdevicefarm_custom_spec_file.yml`](/aws-device-farm-config/awsdevicefarm_custom_spec_file.yml)).

## Quick start (local)

```bash
# 1. Prerequisites installed (see below): Node 18, Appium 2.x + UiAutomator2, JDK 21, an Android device/emulator
npm install                       # install project dependencies
# 2. Put the calculator APK at apk/application.apk  (see apk/README.md)
appium                            # start the Appium server (separate terminal)
adb devices                       # confirm a device/emulator is connected
npm run wdio-local                # run the tests
```

## Prerequisites (local environment)

1. **[Node.js](https://nodejs.org/) 18.x** — verify with `node --version` and `npm --version`.
2. **[Appium](http://appium.io/) 2.x** — `npm install -g appium@">= 2.0.0 <3.0.0"`, verify with `appium --version`.
3. **[UiAutomator2 driver](https://github.com/appium/appium-uiautomator2-driver)** — requires a JDK ([Amazon Corretto 21](https://aws.amazon.com/corretto/) recommended) with `JAVA_HOME` set; then `appium driver install uiautomator2` (verify with `appium driver list`).
4. **An Android device** — either:
   - **Emulator** via [Android Studio](https://developer.android.com/studio): create an AVD, set `ANDROID_HOME`, launch it. Docs: [managing AVDs](https://developer.android.com/studio/run/managing-avds).
   - **Physical phone**: enable [Developer Options](https://developer.android.com/studio/debug/dev-options) + USB debugging, connect via USB.
   - Either way, confirm the device is visible with `adb devices`.

## Running locally

1. Install dependencies: `npm install`.
2. Provide the APK: follow [`apk/README.md`](/apk/README.md) to download it and save it as `apk/application.apk`.
3. Start a device (launch the emulator, or plug in the phone) and confirm with `adb devices`.
4. Start the Appium server in a separate terminal: `appium`.
5. Run the tests: `npm run wdio-local`.

A successful run prints something like:

```
Test some calculations
    When we are summing
       ✓ should sum 1+2
       ✓ should sum 3+5
    When we are subtracting
       ✓ should subtract 6-3
...
8 passing (28.2s)
```

## Running on AWS Device Farm

1. **Set up Device Farm** — follow the [AWS setup guide](https://docs.aws.amazon.com/devicefarm/latest/developerguide/setting-up.html).
2. **Build the test package** from the project root:
   ```bash
   npm run create-zip          # produces calculator-test-js-<version>.zip
   ```
   > `zip` is required on Linux/macOS; on Windows install [7-Zip](https://7-zip.org/download.html).
3. **Create the run** in the [Device Farm console](https://console.aws.amazon.com/devicefarm):
   1. **Mobile Device Testing → Projects → New project**, name it.
   2. **Automated tests → Create a new run**.
   3. **Choose application**: upload the calculator `.apk` (see [`apk/README.md`](/apk/README.md)).
   4. **Setup test framework**: choose **Appium Node.js** and upload the zip from step 2.
   5. **Choose a custom environment**, then **Create a TestSpec** and paste the contents of [`awsdevicefarm_custom_spec_file.yml`](/aws-device-farm-config/awsdevicefarm_custom_spec_file.yml); save it.
   6. **Select devices**: use the built-in **Top Devices** pool, or [create an Android-only pool](https://docs.aws.amazon.com/devicefarm/latest/developerguide/how-to-create-device-pool.html).
   7. Leave **Install additional software** at defaults → **Confirm and start run**.
