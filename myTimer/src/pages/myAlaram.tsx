import React, { useEffect, useState } from 'react';
import useSound from './useSound';

interface MySoundProps {
  isTimeout: boolean;
  onSoundEnd: () => void;
}

const MySound: React.FC<MySoundProps> = ({ isTimeout, onSoundEnd  }) => {
  const [isRinging, setIsRinging] = useState(false);

  // Use a relative path or serve the audio file from a web server
  const ringingSound = useSound('resources/ringing-sound.mp3'); // Assuming assets folder is in the project root

  useEffect(() => {
    if (isTimeout) {
      setIsRinging(true);
      ringingSound.play();
    } else {
      setIsRinging(false);
      ringingSound.stop();
    }
  }, [isTimeout, onSoundEnd]);

  return null; // This component doesn't render anything
};

export default MySound;
