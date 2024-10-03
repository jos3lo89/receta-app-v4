import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'receta-app-v4',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '36209600709-ksv4nol4fdc08aj0n55vm7ackrnt7jed.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
