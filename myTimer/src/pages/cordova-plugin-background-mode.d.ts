declare module '@capacitor/core' {
    interface PluginRegistry {
      BackgroundMode: BackgroundModePlugin;
    }
  }
  
  interface BackgroundModePlugin {
    enable(): void;
    disable(): void;
    setDefaults(options: BackgroundModeOptions): void;
    on(event: 'activate' | 'deactivate', callback: () => void): void;
  }
  
  interface BackgroundModeOptions {
    title?: string;
    text?: string;
    icon?: string;
    color?: string;
    resume?: boolean;
    hidden?: boolean;
    bigText?: boolean;
  }
  