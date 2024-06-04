# Installation und Nutzung von Ionic mit React

## Bevor Sie beginnen, stellen Sie sicher, dass die folgenden Tools auf Ihrem System installiert sind:
- [Node.js](https://nodejs.org/) (Version 12.x oder höher)
- [npm](https://www.npmjs.com/) (Node Package Manager, normalerweise mit Node.js installiert)

## Installation von Ionic CLI
$npm install -g @ionic/cli
$npm install @capacitor/android

## Projekt starten
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


npm run build

# TODO next:
### Add Icon
### Upload app into Cloud
### Check App-Responsivity
### Uopdating App using claud
### Add vibration and Sound

# New Tasks
### Display time when is timer done
### count the seted work hours
### Side menue
### Switch language
### Modal for news
### List for background's colors

