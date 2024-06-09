import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'myTimer',
  webDir: 'dist',
  plugins: {
    LocalNotifications: {
      // plugin configuration values
      android: {
        icon: 'res://icon', // Set the icon for notifications
        color: '#FF0000', // Set the color for notifications
        vibrate: true, // Set to true to vibrate the device when a notification is received
        sound: 'android.resource://com.example.app/raw/alert', // Set the sound file for notifications
        background: true, // Set to true to allow notifications to be received in the background
      },
    },
    },
};

export default config;
