import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import dotenv from 'dotenv';
import replace from '@rollup/plugin-replace';

const env = dotenv.config({ path: '.env' });

if (env.error) {
  throw new Error(`could not load file .env: ${env.error.message}`);
}

const language = process.env.APP_LANG ?? 'de-DE';
const apiBaseUrl = process.env.APP_API_BASE_URL ?? '/api/tmdb';

export const config: Config = {
  namespace: 'tmdb-stencil-frontend',
  plugins: [
    sass(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.APP_LANG': JSON.stringify(language),
        'process.env.APP_API_BASE_URL': JSON.stringify(apiBaseUrl),
      },
    }),
  ],

  globalStyle: 'src/semantic-ui/semantic-ui.css',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'semantic-ui/assets/', dest: 'build/' },
        { src: 'assets/', dest: 'assets/' }
      ],
      serviceWorker: null, // disable service workers
    },
  ],
};
