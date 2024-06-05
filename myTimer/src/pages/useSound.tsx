import { useEffect, useRef } from 'react';

const useSound = (soundUrl?: string) => { // Allow soundUrl to be optional
  const audioRef = useRef<HTMLAudioElement | null>(null); // Use HTMLAudioElement type

  useEffect(() => {
    // Create the audio element only if soundUrl is provided
    if (soundUrl) {
      audioRef.current = new Audio(soundUrl);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset playback position
      }
    };
  }, [soundUrl]); // Re-create audio element if soundUrl changes

  const play = () => {
    console.log("Playing sound...");
    audioRef.current?.play(); // Use optional chaining to handle null
  };

  const stop = () => {
    if (!audioRef.current) return; // Early return if audioRef is null
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, stop };
};

export default useSound;
