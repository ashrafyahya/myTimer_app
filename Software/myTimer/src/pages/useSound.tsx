import { useEffect, useRef } from 'react';

const useSound = (soundUrl: string | undefined) => {
  const audioRef = useRef(new Audio(soundUrl));

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  const play = () => {
    audioRef.current.play();
  };

  const stop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, stop };
};

export default useSound;
