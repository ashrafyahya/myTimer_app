// src/MyVibration.tsx
import React, { useEffect } from 'react';
import { startVibration, stopVibration } from './vibrationService';

interface MyVibrationProps {
  isTimeout: boolean;
}

const MyVibration: React.FC<MyVibrationProps> = ({ isTimeout }) => {
  useEffect(() => {
    if (isTimeout) {
      startVibration(60000); // Start vibration for 1 minute if timeout is true
    } else {
      stopVibration(); // Stop vibration if timeout is false
    }

    // Clean up: Stop vibration when component unmounts
    return () => {
      stopVibration();
    };
  }, [isTimeout]);

  return null; // MyVibration doesn't render anything directly
};

export default MyVibration;
