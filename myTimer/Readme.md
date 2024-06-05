# This Repo is for learinging purposes and practicing App devloping
 
# Installation und Nutzung von Ionic mit React

## Before start working on ionic project be sure you have installed the following:
- [Node.js](https://nodejs.org/) (Version 12.x or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, usually isntalled with Node.js)

## Installation of Ionic CLI
$npm install -g @ionic/cli
$npm install @capacitor/android

## Starting a Projekt
$cd myTimer
$ionic build
$ionic serve
or
$ionic serve --browser="msedge"

$npx cap add android
$npx cap open android //open in android studio


//run the project on a device or emulator
$ionic integrations enable capacitor
$npx cap init [appName] [appId]
then
$npx cap add android
$npx cap copy android
then
$ionic capacitor run android 
or 
$npx cap run android


$npm run build

# TODO next:
### Add Icon                    =====> Ashraf
### Upload app into Cloud       =====> Ashraf
### Check App-Responsivity      =====> Ashraf
### Uopdating App using claud
### Add vibration and Sound     =====> Ashraf

# New Tasks
### Display time when is timer done
### count the seted work hours
### Side menue
### Switch language
### Modal for news
### List for background's colors
### Share Button or at least copy downloading link


