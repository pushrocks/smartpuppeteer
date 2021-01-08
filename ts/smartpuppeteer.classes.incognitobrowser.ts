import { getEnvAwareBrowserInstance } from './smartpuppeteer.classes.smartpuppeteer';
import * as plugins from './smartpuppeteer.plugins';

export class IncognitoBrowser {
  public status: 'started' | 'stopped' = 'stopped';
  public browser: plugins.puppeteer.Browser;

  constructor() {}

  /**
   * starts the IncognitoBrowser
   */
  public async start() {
    this.status = 'started';
    this.browser = await getEnvAwareBrowserInstance();
    this.browser.addListener('disconnected', async (eventArg) => {
      try {
        this.browser.removeAllListeners();
      } catch (err) {}
      if (this.status === 'started') {
        this.browser = await getEnvAwareBrowserInstance();
      }
    });
  }

  /**
   * stops the IncognitoBrowser
   */
  public async stop() {
    this.status = 'stopped';
    await this.browser.close();
  }

  public async getNewIncognitoContext(): Promise<plugins.puppeteer.BrowserContext> {
    if (this.browser) {
      return this.browser.createIncognitoBrowserContext();
    } else {
      throw new Error('you need to start the IncognitoBrowser instance first');
    }
  }
}
