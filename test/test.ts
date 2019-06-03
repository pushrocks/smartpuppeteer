import { expect, tap } from '@pushrocks/tapbundle';
import * as smartpuppeteer from '../ts/index';

tap.test('first test', async () => {
  console.log(smartpuppeteer.standardExport);
});

tap.start();
