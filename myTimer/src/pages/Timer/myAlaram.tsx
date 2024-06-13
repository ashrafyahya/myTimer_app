import React, { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import RingtoneSelector from './ringtoneSelector';  


interface MySoundProps {
  isTimeout: boolean;
  onSoundEnd: () => void;
}

type RingtonesType = {
  [key: string]: string;
};

const ringtones: RingtonesType = {
  'Ringtone 1': '../resources/ringtone1.mp3',
  'Ringtone 2': '../resources/ringtone2.mp3',
  'Ringtone 3': '../resources/ringtone3.mp3',
};


const MySound: React.FC<MySoundProps> = ({ isTimeout, onSoundEnd }) => {
  const [isRinging, setIsRinging] = useState(false);
  const [selectedRingtone, setSelectedRingtone] = useState("defualt");
  const ringtoneRef = useRef<Howl | null>(null);
  
  useEffect(() => {
    if (isTimeout) {
      if (!isRinging) {
        setIsRinging(true);
        if(selectedRingtone == "defualt"){
          ringtoneRef.current = new Howl({
            src: ringtones['Ringtone 1'],
            loop: true,
            autoplay: false,
            volume: 1,
          });

        }
        ringtoneRef.current?.play();
        console.log('started playing ringtone');
      }
    } else {
      if (isRinging) {
        setIsRinging(false);
        ringtoneRef.current?.stop();
        console.log('stopped playing ringtone');
      }
    }
  }, [isTimeout, isRinging]);

  const handleRingtoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKey = event.target.value as keyof RingtonesType;
    setSelectedRingtone(ringtones[selectedKey]);

    if (ringtoneRef.current) {        
    ringtoneRef.current.unload();     // Unload the previous instance if it exists
  }

  ringtoneRef.current = new Howl({       // Initialize the Howl instance with the selected ringtone
    src: ringtones[selectedKey],
    loop: true,
    autoplay: false,
    volume: 1,
  });

  if(!isTimeout){
    ringtoneRef.current.play();             // Play selected ringtone for two seconds
    setTimeout(() => {
      ringtoneRef.current?.stop();
      console.log('finished playing selected ringtone for 3 seconds');
    }, 2000);
  }

  return () => {
    ringtoneRef.current?.unload();
  };

  };

  return (
    <RingtoneSelector ringtones={ringtones} onChange={handleRingtoneChange} />
  );
};

export default MySound;
