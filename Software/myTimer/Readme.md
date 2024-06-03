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

npx cap add android
npx cap open android //open in android studio


//run the project on a device or emulator
ionic integrations enable capacitor
$npx cap init [appName] [appId]
then
$npx cap add android
then
$ionic capacitor run android 
or 
$npx cap run android


# TODO nächst:
### Icon vergeben
### Auf Cloud stellen
### App-Responsivität prüfen
### App Cloudsweise aktuallisieren
### Vibration und Sound mitbauen
