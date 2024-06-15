import React, { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

interface MySoundProps {
  isTimeout: boolean;
  soundVolume: number
  // onSoundEnd: () => void;
}

const MySound: React.FC<MySoundProps> = ({ isTimeout, soundVolume }) => {
  const [isRinging, setIsRinging] = useState(false);


  const ringtoneRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize Howl instance
    ringtoneRef.current = new Howl({
      src: ['../resources/ringing-sound.mp3'],
      loop: false,
      autoplay: false,
      volume: soundVolume,
      // onend: onSoundEnd,
    }, [soundVolume]);

    // Cleanup Howl instance on unmount
    return () => {
      ringtoneRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    // Update the volume whenever soundVolume prop changes
    if (ringtoneRef.current) {
      ringtoneRef.current.volume(soundVolume);
    }
  }, [soundVolume]);

  useEffect(() => {

    if (isTimeout) {
      if (!isRinging){
        setIsRinging(true);
        ringtoneRef.current.play();
        console.log('started playing ringtone');
    }
      
    } else {
      if(isRinging){
        setIsRinging(false);
        ringtoneRef.current.stop();
        console.log('stopped playing ringtone');
      }
    }
  }, [isTimeout, soundVolume]);

  return null; // This component doesn't render anything
};

export default MySound;
