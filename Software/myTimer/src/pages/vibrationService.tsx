// src/vibrationService.ts
import { Vibration } from '@awesome-cordova-plugins/vibration';

const startVibration = (duration: number) => {
  Vibration.vibrate(duration);
};

const stopVibration = () => {
  Vibration.vibrate(0);
};

export { startVibration, stopVibration };
