import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import dotEnvPlugin from 'rollup-plugin-dotenv';

export const config: Config = {
  namespace: 'tmdb-stencil-frontend',
  plugins: [
    sass(),
    dotEnvPlugin()
  ],
  globalStyle: 'src/semantic-ui/semantic-ui.css',

  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
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
