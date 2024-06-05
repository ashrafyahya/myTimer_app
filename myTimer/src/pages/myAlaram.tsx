import React, { useState, useEffect } from 'react';
import useSound from './useSound';

interface MySoundProps {
  isTimeout: boolean;
}

const MySound: React.FC<MySoundProps> = ({ isTimeout }) => {
  const [isRinging, setIsRinging] = useState(false);

  // Use a relative path or serve the audio file from a web server
  const ringingSound = useSound('/assets/ringing-sound.mp3'); // Assuming assets folder is in the project root

  useEffect(() => {
    if (isTimeout) {
      setIsRinging(true);
      ringingSound.play();
    } else {
      setIsRinging(false);
      ringingSound.stop();
    }
  }, [isTimeout]);

  return null; // This component doesn't render anything
};

export default MySound;
