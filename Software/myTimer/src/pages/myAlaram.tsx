import React, { useState, useEffect } from 'react';
import { Vibration } from '@awesome-cordova-plugins/vibration';
import useSound from './useSound';

interface MySoundProps {
    isTimeout: boolean;
  }
  const MySound: React.FC<MySoundProps> = ({ isTimeout }) => {
  const [isRinging, setIsRinging] = useState(false);
  const ringingSound = useSound('/assets/ringing-sound.mp3'); // Hier den Pfad zur Sounddatei einfügen

  useEffect(() => {
    if (isTimeout) {
      setIsRinging(true);
      ringingSound.play(); // Spiele das Audio ab, wenn die Zeit abgelaufen ist
    } else {
      setIsRinging(false);
      ringingSound.stop(); // Stoppe das Audio, wenn die Zeit nicht abgelaufen ist
    }
  }, [isTimeout]);
  return null;
}

export default MySound;
