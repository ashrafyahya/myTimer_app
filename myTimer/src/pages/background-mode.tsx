import { Plugins } from '@capacitor/core';
import { useEffect, useState } from 'react';

const { BackgroundModePlugin } = Plugins;

const useBackgroundMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    BackgroundModePlugin.isEnabled().then((enabled: boolean | ((prevState: boolean) => boolean)) => {
      setIsEnabled(enabled);
    });

    BackgroundModePlugin.onChange().subscribe((enabled: boolean | ((prevState: boolean) => boolean)) => {
      setIsEnabled(enabled);
    });
  }, []);

  const enableBackgroundMode = async () => {
    await BackgroundModePlugin.enable();
  };

  const disableBackgroundMode = async () => {
    await BackgroundModePlugin.disable();
  };

  return { isEnabled, enableBackgroundMode, disableBackgroundMode };
};

export default useBackgroundMode;