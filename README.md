# Angular - QZ Tray Printer Service

This project was created to integrate QZ Tray Printer Service to an Angular Application. This is done by following the resources 
for integration of QZ Tray and making some code to make it work like a magic! :)

## Steps to Recreate
1. Setup the dependencies for QZ Tray and generate your own keys. Following this url (https://ijustlearnedsomethingnewtoday.blogspot.com/2017/04/using-self-signed-certificates-with-qz.html)

2. Add qz-tray.js, rsvp-3.1.0.min.js and sha-256.min.js to your src/scripts directory

3. reference those script files to your scripts array on angular.json 

    Sample :
    ```json
    "scripts": [
        "src/scripts/qz-tray.js",
        "src/scripts/rsvp-3.1.0.min.js",
        "src/scripts/sha-256.min.js"
        ...
    ]
    ```

4. Run the command and reference it again to your angular.json
    ```sh
    npm install --save jsrsasign
    ```

5. Declare a typings for the jsrsasign on your tsconfig.json
    ```json
    "typeRoots": [
        "src/typings/jsrsasign.d.ts" ,
        ...
    ],
    ```

6. Create a typings directory under src/ and add the typing for typescript of jsrsasign

    https://github.com/kinoh/DominoBridge/blob/master/libs/jsrsasign.d.ts

7. Include the QZ Tray functionalities to service and import the jsrassign

    Sample
    ```ts
        import * as KJUR from 'jsrsasign';
    ```


## Useful resources for the integration
* https://ijustlearnedsomethingnewtoday.blogspot.com/2017/04/using-self-signed-certificates-with-qz.html
* https://qz.io/wiki/2.0-signing-messages
* https://github.com/qzind/tray/blob/2.0/assets/signing/sign-message.js
* https://medium.com/@yehandjoe/angular-2-raw-printing-service-56614d358754
* https://hackernoon.com/how-to-use-javascript-libraries-in-angular-2-apps-ff274ba601af


A big thanks for the author those references! :)