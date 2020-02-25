// node native scope
import * as os from 'os';

export {
  os
};

// @pushrocks scope
import * as smartdelay from '@pushrocks/smartdelay';
import * as smartenv from '@pushrocks/smartenv';

export { smartdelay, smartenv };

// third party scope
import puppeteer from 'puppeteer';

export { puppeteer };
