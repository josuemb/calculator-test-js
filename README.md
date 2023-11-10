# calculator-test-js
Example application to made [end-to-end (E2E) testing](https://developer.android.com/training/testing/fundamentals#scope) for an Android Application using [Appium](http://appium.io/), [Webdriver.IO](https://webdriver.io/) and [mochaJS](https://mochajs.org/) locally using either an emulator or actual Android phones or in [AWS DeviceFarm](https://aws.amazon.com/device-farm/) as a cloud testing service that uses real devices.<br>
This example was made with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview). If you prefer a [Typescript language](https://www.typescriptlang.org/) version, look at: https://github.com/josuemb/calculator-test-ts.

## Introduction
This application shows how can we create an [end-to-end (E2E) testing](https://developer.android.com/training/testing/fundamentals#scope) over an Android Application, in this case, we will test a calculator application. We will use just the [apk file](<https://en.wikipedia.org/wiki/Apk_(file_format)>). Since we don't have the source code, demonstrating than it is not necessary to own the code for this kind of tests.<br>
This solution will install the application on the device using the [apk file](<https://en.wikipedia.org/wiki/Apk_(file_format)>), then it will open it and made some simple operations and then it will compare the obtained result against the expected result.<br>
To make testing process easier we will use the [Page Object Pattern](https://webdriver.io/docs/pageobjects/) by [Martin Fowler](https://www.martinfowler.com/bliki/PageObject.html). See: https://webdriver.io/docs/pageobjects/.

## Components
The next components list is given in the order the communication flows from the test framework to the Android device.
1. [MochaJS](https://mochajs.org/) according to its web page it "is a feature-rich JavaScript test framework running on [Node.js](https://nodejs.org/) and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases".
It is the center of this testing solution. Whole flow starts by executing the tests we design to be executed against the [Android](https://www.android.com/what-is-android/) device. To make testing easier and using good practices we are using [Page Object Pattern](https://webdriver.io/docs/pageobjects/) by [Martin Fowler](https://www.martinfowler.com/bliki/PageObject.html). See: https://webdriver.io/docs/pageobjects/.<br>
See how can you start with [MochaJS](https://mochajs.org/) in: https://mochajs.org/#getting-started.
See the run cycle of [MochaJS](https://mochajs.org/) in: https://mochajs.org/#run-cycle-overview.
Some additional considerations for the testing code are:<br>
    - We are using the [BDD interface](https://mochajs.org/#bdd) of [MochaJS](https://mochajs.org/) to keep the tests easy to read and well organized. See more at: https://mochajs.org/#bdd.
    - We are using [async code](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/async_function) to make a better use of compute resources. See more at: https://mochajs.org/#using-async-await.
    - We are using [arrow funtions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to create the testing code and making the code more readable. See more at: https://mochajs.org/#arrow-functions.
    - We are using the before and after [hooks](https://mochajs.org/#hooks) to open and close the application, respectively. See more at: https://mochajs.org/#hooks.
    - We are using [expect.js](https://github.com/LearnBoost/expect.js) to make the assertions easier and more descriptive. Se more at: https://mochajs.org/#assertions.
    - See the tests file: [test.e22.js](/test/specs/test.e2e.js).
2. [Node.js](https://nodejs.org/): "is an open-source, cross-platform JavaScript runtime environment". It allows us to execute the tests either locally or in the cloud using [AWS Device Farm](https://aws.amazon.com/device-farm/).<br>
See more at: https://nodejs.org/en/about.

3. [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript): "is a programming language used most often for dynamic client-side scripts on webpages, but it is also often used on the [server-side](https://developer.mozilla.org/en-US/docs/Glossary/Server), using a runtime such as [Node.js](https://nodejs.org/)".<br>
In this solution we are using JavaScript since is a very known language with wide support and very mature.<br>
See more about JavaScript at: https://developer.mozilla.org/en-US/docs/Glossary/JavaScript and https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript.<br>
As an alternative, we can also use [Typescript](https://www.typescriptlang.org/) but it requires more set up effort and the learning curve is harder for teams non used to it.

4. [Appium](http://appium.io/): It is the center of the solutions. According to its web page it "is an open-source project and ecosystem of related software, designed to facilitate UI automation of many app platforms, including mobile (iOS, Android, Tizen), browser (Chrome, Firefox, Safari), desktop (macOS, Windows), TV (Roku, tvOS, Android TV, Samsung), and more". See more on: http://appium.io/.<br>
This component of the solution will be responsible to be an intermediary between the testing software and the Android Device. It implements the [WebDriver specification](https://w3c.github.io/webdriver/webdriver-spec.html) and is capable to listen using an HTTP endpoint to make its job.<br>
It stay listening for instructions and when something arrives it uses the corresponding Driver, [Appium's UIAutomator Driver](https://github.com/appium/appium-uiautomator2-driver) in this case to execute some instruction against the device, [Android](https://www.android.com/what-is-android/) in this case. See next point for more details about the Driver interaction.<br>
For this solution, we will use [Appium](http://appium.io/) ver 2.x with **Custom test environment**.
Read more about both test environments at: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-environments.html
See more about **Custom test environment** for Android at: https://docs.aws.amazon.com/devicefarm/latest/developerguide/custom-test-environments.html

5. [Appium's UIAutomator Driver](https://github.com/appium/appium-uiautomator2-driver) it is part of the [Appium](http://appium.io/) ecosystem. It is responsible to drive all interactions with Android Device. It internally uses [UI framework](https://developer.android.com/training/testing/ui-automator) as well as [Appium ADB](https://github.com/appium/appium-adb) to communicate with the device. It stays "listening" for instructions from Appium Server and when something arrives it sends instructions to the device to do something, like, installing, opening or interacting with an application or any other part of the device.

6. [Android Emulator](https://developer.android.com/studio/run/emulator) (optional). It is a software that is capable to emulate [Android](https://www.android.com/what-is-android/) devices and running applications in it. it is so useful specially when we are building the tests. It allows us to run tests against the application running into the emulator.
Se more information at: https://developer.android.com/studio/run/emulator.

7. Physical [Android Phone](https://www.android.com/what-is-android/). It is so useful to execute the tests when we have finished, ideally using the [Android Emulator](https://developer.android.com/studio/run/emulator). In order to be able to execute the tests, we must enable the [Developer Options](https://developer.android.com/studio/debug/dev-options) into the phone as well as enable the USB debugging options and connect the device using a USB cable. See more at: https://developer.android.com/studio/debug/dev-options.

8. [AWS Device Farm](https://aws.amazon.com/device-farm/). It "is an app testing service that you can use to test and interact with your Android, iOS, and web apps on real, physical phones and tablets that are hosted by Amazon Web Services (AWS)".<br>
It allows to test against a plenty of real devices (for this case we will use just Android devices but it can execute against 138 different devices at the moment I am writing this) with different OS version and features from start to top range, either phones or tablets.<br>
See full list of supported devices at: https://aws.amazon.com/device-farm/device-list/.<br>
It is capable to execute manual or automated testing. For this solution we will use automated tests.<br>
We can use private or shared devices. Is up to you what to use according to your particular need. See more at: https://docs.aws.amazon.com/devicefarm/latest/developerguide/working-with-private-devices.html.<br>
It supports different [test types and frameworks](https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types.html), however for this solution we will use Appium tests with [Node.js](https://nodejs.org/).<br>
**Important:**
Since [AWS Device Farm](https://aws.amazon.com/device-farm/) **Custom test environment** give us more flexibility, we will use it as the desired test environment. See the supported software for this environment at: https://docs.aws.amazon.com/devicefarm/latest/developerguide/amazon-linux-2-supported-software.html.<br>
For this example we will with the next software configuration:
    - [Node.js](https://nodejs.org/) version 18.x<br>
    - [Appium](http://appium.io/) version 2.X.<br>

## Environment
Next subsections describe how to enable each testing environment: local environment and Cloud environment.
### Local testing environment
For the local testing environment, we need to set many things up. Next, we are describing each component:
1. [Node.js](https://nodejs.org/):<br> To see how to install it depending on you OS see: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs.<br>
Since the last version capable to run into AWS Device effortless is 16.x (last available release), then the recommendation is to use same version in the local environment.<br>
Once you finished the installation, you can check the installation was successful by executing the command:<br>
<code>node --version</code><br>
Additionally, when you install [Node.js](https://nodejs.org/) you also install [npm](https://docs.npmjs.com/about-npm) which we will use to install [Appium](http://appium.io/) in the next step.
See more about npm in: https://docs.npmjs.com/about-npm.
To check it npm is installed running well, please execute the command:<br>
<code>npm --version</code>

2. [Appium](http://appium.io/):<br> We will install Appium using npm.<br>
For this example, we will use [Standard test environment](https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-environments.html#test-environments-standard) since it give us more flexibility.<br>
It supports node.js 16.x and Appium ver 1.x. See: https://docs.aws.amazon.com/devicefarm/latest/developerguide/amazon-linux-2-supported-software.html<br>
Install local version by executing:<br>
<code>npm install -g appium@">= 1.0.0 <2.0.0"</code><br>
Once [Appium](http://appium.io/) is installed, you can check the installation was successful by executing the command:<br>
<code>appium --version</code>

3. [Appium's UIAutomator Driver](https://github.com/appium/appium-uiautomator2-driver):<br>
The necessary steps to install Appium's UIAutomator Driver:
    1. Install a compatible JDK with a recent version, version 21 is recommended. The recommended OpenJDK to be installed is [Amazon Corretto](https://aws.amazon.com/corretto/), the Amazon from JDK. See how to install it an more information at: https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/what-is-corretto-21.html.<br>
    you can check the installation was successful by executing the command:<br>
    <code>javac --version</code><br>
    If it didn't work, you can check if the installation is included into the *PATH* environment variable. The Amazon Correto User Guide includes instructions about configuring PATH environment variable according to the Operative System. Example: https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/windows-10-install.html
    2. Configure *JAVA_HOME* environment variable. The Amazon Correto User Guide includes instructions about configuring PATH environment variable according to the Operative System. Example: https://docs.aws.amazon.com/corretto/latest/corretto-21-ug/windows-10-install.html.
    3. Since we are using Appium v 2.x, it is necessary installing [Appium's UIAutomator Driver](https://github.com/appium/appium-uiautomator2-driver) by executing the next command:<br>
    <code>appium driver install uiautomator2</code><br>
    You can check the installation was successful by executing the command:<br>
    <code>appium driver list</code><br>

4. [Android Emulator](https://developer.android.com/studio/run/emulator):<br> If you want to use an emulated device, we can do it in several way but the easier and the recommended one is to install it by using [Android Studio](https://developer.android.com/studio). To install and configure the emulator and developer tools, those are the required steps:
    1. Install Android Studio: To see how to install it, look at this: https://developer.android.com/studio/install.<br>
    2. Create a new virtual device. To create a new virtual device, see this guide: https://developer.android.com/studio/run/managing-avds.
    3. Create *ANDROID_HOME* environment variable. See more information at: https://developer.android.com/tools/variables.
    4. Run the emulator. Se how to id at: https://developer.android.com/studio/run/emulator#get-started.
    5. Before executing the tests in the emulator, it is necessary to check if emulated device is reachable by running the command:<br>
    <code>adb devices</code><br>
    The command must return a list of the devices, emulated in this case.

5. **Physical Android Device**:<br> To execute tests against a hardware device, check at this guide: https://developer.android.com/studio/run/device.<br>
Before executing the tests in the physical device it is necessary to check if emulated device is reachable by running the command:<br>
<code>adb devices</code><br>
The command must return a list of the devices, connected hardware in this case.

### Cloud testing environment
For the cloud testing environment, we just need to few steps into [AWS Device Farm](https://aws.amazon.com/device-farm/):
1. Setting up AWS Device Farm. See AWS guide at: https://docs.aws.amazon.com/devicefarm/latest/developerguide/setting-up.html.
2. To create the automated test using [Appium](http://appium.io/) as the test framework and [Node.js](https://nodejs.org/) as the execution engine, follow the next guide:
    1. Download the code of this repo using the git command:
    <code>git clone https://github.com/josuemb/calculator-test-js.git</code><br>
    2. Create the **test zip file** by executing the command:<br>
    <code>npm create-zip</code><br>
    In the root folder of the recent downloaded project.<br>
    It will create a file named: **calculator-test-0.0.1.zip** where 0.0.1 is the corresponding version into the **package.json** file. This file will be used to upload and execute tests into [AWS Device Farm](https://aws.amazon.com/device-farm/) service.
    3. Sign into the [AWS Device Farm](https://aws.amazon.com/device-farm/) console at: https://console.aws.amazon.com/devicefarm.
    4. In the navigation pane, choose **Mobile Device Testing**, and then choose **Projects**.
    5. Under **Mobile Device Testing Projects**, choose **New project**.
    6. Under **Create project**, enter a **Project Name** (you can choose a relevant name for you case).
    7. On the **Automated tests** page, choose **Create a new run**.
    8. On the **Choose application** page, under **Mobile App**, choose **Choose File**, and then choose an Android (.apk) file from your computer. Or, drag the file from your computer and drop it in the console.<br>
    To get the example APK file see: [APK README file](/apk/README.md).
    9. Enter a **Run name**, anything relevant for your case. By default, the Device Farm console uses the file name you have choose in the previous step.
    10. On the **Configure** page, under **Setup test framework**, choose the **Apium Node.js** option, then click in **Choose file** button and choose the file we have created into the step 2.
    11. Choose to either **Run your test in our standard environment** or **Run your test in a custom environment**. The standard environment has granular, per-test reporting, while the custom environment is capable of running custom test harnesses built on top of any framework. <br>
    Using the custom environment allows for full control over test setup, teardown, and invocation, as well as choosing specific versions of runtimes and the Appium server.
    12. Choose Next, and then on the **Create a TestSpec** button.
    13. On the **Edit your YAML** screen replace contents with the provided file, depending on the desired test environment: **Standard** or **Custom**. See details on the **Appium** component of the **Local test environment** section. For each test environment you must use different  configuration:
        1. [Standard test environment](https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-environments.html#test-environments-standard):<br>
        Use [aws-device-farm-config/awsdevicefarm_standard_spec_file.yml](/aws-device-farm-config/awsdevicefarm_standard_spec_file.yml), so the suggestion is to copy/paste the contents and then into the **Save as** input text provide a name, the suggestion is to name it as *awsdevicefarm_standard_spec_file* (extension is given automatically). After that, click on the **Save as New** button.
        2. [Custom test environment](https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-environments.html#custom-test-environment):<br>
        Use [aws-device-farm-config/awsdevicefarm_custom_spec_file.yml](/aws-device-farm-config/awsdevicefarm_custom_spec_file.yml), so the suggestion is to copy/paste the contents and then into the **Save as** input text provide a name, the suggestion is to name it as *awsdevicefarm_standard_spec_file* (extension is given automatically). After that, click on the **Save as New** button.
    14. Click on the **Next** button.
    15. On the **Select mobile devices to test** screen select the prefilled **Top Devices** pool or click on the **Create device pool** in case you want to create a custom pool.
    16. In case you have choose the **Create device pool** option, you can follow the instructions on: https://docs.aws.amazon.com/devicefarm/latest/developerguide/how-to-create-device-pool.html#how-to-create-device-pool-console. To create a custom device pool. Don't forget to select just Android devices.
    17. Being on the **Install additional software** screen leave defaults options and click on the **Next** button.
    18. Finally, being on the **Review and start run** screen, click on the **Confirm and start run** button.

## Testing

### Local testing
To execute local testing, it is necessary to execute the next steps:
1. Execute all the steps indicated in the section called **Cloud testing environment**.
2. Open a command line and change the directory to the local folder when you downloaded the source code of this project. Example:<br>
<code>cd /home/username/calculator-test-js</code>
3. Install all dependencies by executing next command in the command line:<br>
<code>npm install</code>
4. In case you want to test with emulator then you need to execute next steps:
    1. Execute all the steps indicated in the section **Local testing environment**, subsection **Emulator**. Once you created and Android Virtual Device (aka avd), take note on the avd name. We will use this name to start emulating this device.
    2. Start emulating the device with the next command:<br>
    <code>emulator -avd avd_name</code><br>
    Where *avd_name* is the name of the Android Virtual Device mentioned in the previous step.
5. In case you want to test using a real Android device, you need to execute all the steps indicated in the section **Local testing environment**, subsection **Physical Android Device**.
6. Execute [Appium](http://appium.io/) in the command line by executing the next command in the command line:<br>
<code>appium</code><br>
In case everything goes will you will see next message into the command line:<br>
<code>
[Appium] Welcome to Appium v1.22.3<br>
[Appium] Appium REST http interface listener started on 0.0.0.0:4723
</code><br>
Where v.1.22.3 is the last available [Appium](http://appium.io/) version and it could change depending on the specific version you have installed.<br>
**IMPORTANT:** If the version is >= 2.0.0 then, the tests will not run and you need to uninstall this version and install last available 1.X available version.
7. Follow instructions indicated in the file [/apk/README.md](/apk/README.md) and name the apk file as *application.apk* into the *apk* folder of the root folder of this solution.
8. Execute all tests by executing the next command in the command line:<br>
<code>npm run wdio-local</code><br>
If everything goes well you will see the tests being executed in the emulator or real Android device and after finishing you will see the final spec report, something like:<br>
<code>
[/home/username/calculator-test-js/apk/application.apk Android #0-0] Running: /home/username/calculator-test-js/apk/application.apk on Android<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0] Session ID: 954a579b-e3dd-4c75-892a-cfa178d28b5e<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0] » /test/specs/test.e2e.js<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0] Test some calculations<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]     When we are suming<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should sum 1+2<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should sum 3+5<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]     When we are substracting<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should substract 6-3<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should substract 9-2
[/home/username/calculator-test-js/apk/application.apk Android #0-0]<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]     When we are multipliying<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should multiply 3*4<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should multiply 7*6<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]     When we are dividing<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should divide 8/2<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]        ✓ should divide 9/3<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0]<br>
[/home/username/calculator-test-js/apk/application.apk Android #0-0] 8 passing (28.2s)<br>
</code>

### Cloud testing

#### Prerequisites
To create test zip file, it is necessary to install the software according to the Operative System:
- For Linux or MacOS, you must install *zip* command. Instructions are specific for each OS/Linux Distribution.
- For Windows you must install 7zip. See more on: https://7-zip.org/download.html.

#### Create zip test file
To create the zip test file, it is necessary to execute next steps:
1. Open a command line and go to the root folder of this project. Example:<br>
<code>cd /home/username/calculator-test-js</code>
2. Execute the command to create the zip file:<br>
<code>npm run create-zip</code><br>
If everything goes well, you will see the just created zip file: **calculator-test-0.0.1.zip**<br>
Where 0.0.1 is the **version** field into the **package.json** file.

#### Execute test file
1. To execute cloud tests for the first time, it is necessary to execute all the steps described in the section called **Cloud testing environment** above.
2. In case you have an existing testing environment, then you must create a new run by executing the process described  here: https://docs.aws.amazon.com/devicefarm/latest/developerguide/how-to-create-test-run.html
