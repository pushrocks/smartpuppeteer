import { expect, tap } from '@pushrocks/tapbundle';
import * as smartpuppeteer from '../ts/index';

tap.test('first test', async () => {
  const headlessBrowser = await smartpuppeteer.getEnvAwareBrowserInstance({
    forceNoSandbox: true
  });
  await headlessBrowser.close();
});

tap.start();
