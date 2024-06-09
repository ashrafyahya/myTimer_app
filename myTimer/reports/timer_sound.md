the initial code used the import './useSound' to play audio, which worked on browser but not on the mobile app,
after some online search, i came to know that this method is meant to be used for web apps only, 
so i searched for an alternative solution, i tried capacitor-community/native-audio which seemed to have a very good reputaton
but when i attemped to install it, i was requested to install its peer dependency which is not compatible with the latst capacitor version, downgrading capacitor didnt  work so did force downgrading capacitor-community/native-audio without its peer dependency.
lastly, i came accross the Holwer library which seems to be a very robust one considering i needed only basic functions to play and stop the audio, lots of more interesting functions can be found at: https://github.com/goldfire/howler.js/tree/master?tab=readme-ov-file 

## old code:

import useSound from './useSound';
const ringingSound = useSound('resources/ringing-sound.mp3');
      ringingSound.play();
      ringingSound.stop();

## new code:
import { Howl } from 'howler';
var ringtone = new Howl({
  src: [ '../resources/ringing-sound.mp3'],
  loop: false,
  autoplay:false,
  volume: 1,

  ringtone.play();
  ringtone.stop();
});
