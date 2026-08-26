# Important:

In order to run local tests with `npm run wdio-local` (or to upload the app to AWS Device Farm) you will need to provide the calculator APK first:

1) Open this page in a browser and download the APK for the Google Calculator app: https://apkpure.com/calculator/com.google.android.calculator
   - Click the **Download** button on the page (a direct `curl`/`wget` to that URL returns the web page, not the binary, so use a browser).
   - If the site gives you an **XAPK** (a bundle of split APKs), extract it and use the base `.apk`, or pick the plain single **APK** download option — AWS Device Farm and the local flow expect a single `.apk`.
2) Put the downloaded file into this `apk` folder.
3) Rename the file to `application.apk`.

Note: the APK is not committed to this repository, so you must download it as described above before running the tests.
