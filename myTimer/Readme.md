# Installation and using von Ionic mit React  

## Before start working on ionic project be sure you have installed the following:  
- [Node.js](https://nodejs.org/) (Version 12.x or higher)        
- [npm](https://www.npmjs.com/) (Node Package Manager, usually isntalled with Node.js)        

## [Jump to PlugIns](#plugin)  
## [Jump to Tasks](#tasks)  
## [Jump to Bugs](#bugs) 
## [Jump to Firebase](#firebase) 

## Installation of Ionic CLI  
```$npm install -g @ionic/cli```  
```$npm install @capacitor/android```  
```$npm install```  

## Starting a Projekt  
```$cd myTimer```  
```$ionic build```  
```$ionic serve```  
or  
```$ionic serve --browser="msedge"```  

```$npx cap add android```  
```$npx cap open android```        //open in android studio  


run the project on a device or emulator  
```$ionic integrations enable capacitor```  
```$npx cap init [appName] [appId]```        // delete capacitor.config.ts if already there  
then  
```$npx cap add android```        // Do this if android not exist or delete it first  
```$npx cap copy android```        //in capacitor.config.ts DO: webDir: 'dist'  
```$ionic cap sync```  
then  
```$ionic capacitor run android```        //open in a simulator  
or 
```$npx cap run android```  

### This could be helpful  
```$npm run build```  
```$npm install cordova-plugin-file@^8.0.0 ``` 

### If JAVA_HOME seted wrong!  
```$set JAVA_HOME=C:\Program Files\Java\jdk-<version>```  

#### If having problems with ADB  
```$cd C:\Users\dell\AppData\Local\Android\Sdk\platform-tools```  
then  
```$adb kill-server```  
then  
```$adb start-server```  

<a id="plugin"></a> 
## Plugins:
```$npm install cordova-plugin-media```       //Plugin for vibration --> avoid it pls  
```$npx cap add @capacitor/haptics```        //Plugin for vibration --> use it pls  
```$npm install cordova-plugin-media```        //Plugin for media or use following command  
Add installation command for vibration plugin here ...  


<a id="tasks"></a> 
# TODO next:  

## Notice: Doing tasks should be in seperate branches. Pls do not make changes in main branch.  

### ~~Add Icons                 =====> Ashraf       =====>WIP =====>Done~~  
### ~~Upload app into Cloud       =====> Ashraf       =====>WIP  =====>Done~~  
### ~~Check App-Responsivity      =====> Ashraf       =====>WIP =====>Done~~  
### Updating App using claud  
### ~~Add vibration               =====> Ashraf     =====> Done~~  
### ~~Add Sound                   =====> Ashraf     =====>WIP =====> Done~~  


# New Tasks
### ~~Stop sound after a while like the vibration after 20s  =====> Ashraf     =====>WIP =====> Done~~  
### ~~Restruct the project files        =====> Ashraf     =====>WIP  =====> Done~~ 
### count the seted work hours  
### ~~Setting modal   =====> Ashraf     =====>WIP  =====> Done~~ 
### ~~Setting:  Button for de/reacttivation of Vibration   =====> Ashraf     =====>WIP =====> Done~~ 
### Setting: Button for de/reacttivation of Sound  =====> Ashraf     =====>WIP 
### Setting: Choices for sounds  =====> Abdo     =====>WIP 
### Setting:  Switch language  
### Setting: Modal for news  
### Setting: List for background's colors  =====> Ashraf     =====>WIP 
### Setting: Share Button or at least copy downloading link  =====> Ashraf     =====>WIP 

## For more tasks look repo issues

<a id="bugs"></a> 
# Bugs:  
### Bug: Timer does not work in off-display  



<a id="firebase"></a> 
# Firebase:  
## Installation and deploying  
...
### Hosting URL: https://mytimer-ab4a6.web.app  
