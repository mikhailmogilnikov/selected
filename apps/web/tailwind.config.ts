import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'theme' | 'darkMode'> = {
  content: ['./src/**/*.tsx', './app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {},
};

export default config;
