import React, { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

interface MySoundProps {
  isTimeout: boolean;
  onSoundEnd: () => void;
}

var ringtone = new Howl({
  src: [ '../resources/ringing-sound.mp3'],
  loop: false,
  autoplay:false,
  volume: 1,
  // onend: function() {
  //   console.log('finished playing ringtone!');
  // },
  // onstop: function() {
  //   console.log('stopped playing ringtone!');
  // }
  
});

const MySound: React.FC<MySoundProps> = ({ isTimeout, onSoundEnd  }) => {
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {

    if (isTimeout) {
      if (!isRinging){
        setIsRinging(true);
        ringtone.play();
        console.log('started playing ringtone');
    }
      
    } else {
      if(isRinging){
        setIsRinging(false);
        ringtone.stop();
        console.log('stopped playing ringtone');
      }
    }
  }, [isTimeout, onSoundEnd]);

  return null; // This component doesn't render anything
};

export default MySound;
