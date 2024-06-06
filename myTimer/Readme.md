# Installation and using von Ionic mit React

## Before start working on ionic project be sure you have installed the following:
- [Node.js](https://nodejs.org/) (Version 12.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, usually isntalled with Node.js)

## [Jump to Tasks:](#tasks) 

## Installation of Ionic CLI
$npm install -g @ionic/cli  
$npm install @capacitor/android  
$npm install  

## Starting a Projekt  
$cd myTimer  
$ionic build  
$ionic serve  
or  
$ionic serve --browser="msedge"  

$npx cap add android  
$npx cap open android           //open in android studio  


run the project on a device or emulator  
$ionic integrations enable capacitor
$npx cap init [appName] [appId]  // delete capacitor.config.ts if already there
then
$npx cap add android            // Do this if android not exist or delete it first  
$npx cap copy android           //in capacitor.config.ts DO: webDir: 'dist'  
$ionic cap sync  
then
$ionic capacitor run android    //open in a simulator  
or 
$npx cap run android

### This could be helpful
$npm run build
$npm install cordova-plugin-file@^8.0.0

### If JAVA_HOME seted wrong!
$set JAVA_HOME=C:\Program Files\Java\jdk-<version>

#### If having problems with ADB
$cd C:\Users\dell\AppData\Local\Android\Sdk\platform-tools
then
$adb kill-server   
then
$adb start-server


## Plugins:
$npm install cordova-plugin-media        //Plugin for vibration --> avoid it pls
$npx cap add @capacitor/haptics      //Plugin for vibration --> use it pls
$npm install cordova-plugin-media        //Plugin for media or use following command


<a id="tasks"></a> 
# TODO next:

## Notice: Doing tasks should be in seperate branches. Pls do not make changes in main branch.

### ~~Add Icons                 =====> Ashraf       =====>WIP =====>Done~~  
### Upload app into Cloud       =====> Ashraf       =====>WIP  
### ~~Check App-Responsivity      =====> Ashraf       =====>WIP =====>Done~~  
### Uopdating App using claud  
### ~~Add vibration               =====> Ashraf     =====> Done~~  
### ~~Add Sound                   =====> Ashraf     =====>WIP =====> Done~~  


# New Tasks
### Stop sound after a while like the vibration after 20s
### Display time when timer is done
### count the seted work hours
### Side menue
### Button for deacttivation of Vibration
### Button for deacttivation of Sound
### Switch language
### Modal for news
### List for background's colors
### Share Button or at least copy downloading link


