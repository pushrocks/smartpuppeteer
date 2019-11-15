import * as plugins from './smartpuppeteer.plugins';

export interface IEnvAwareOptions {
  forceNoSandbox?: boolean;
}

export const getEnvAwareBrowserInstance = async (
  optionsArg: IEnvAwareOptions = {}
): Promise<plugins.puppeteer.Browser> => {
  const smartenv = new plugins.smartenv.Smartenv();
  const options: IEnvAwareOptions = {
    ...{
      forceNoSandbox: false
    },
    ...optionsArg
  };

  let chromeArgs: string[] = [];
  if ((process.env.CI || options.forceNoSandbox) && !smartenv.isWsl) {
    chromeArgs = chromeArgs.concat([
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // '--disable-dev-shm-usage'
    ]);
  }

  let headlessBrowser: plugins.puppeteer.Browser;
  if (!smartenv.isWsl) {
    // lets get the actual instance
    console.log('launching puppeteer bundled chrome');
    headlessBrowser = await plugins.puppeteer.launch({
      args: chromeArgs
    });
  } else {
    console.log('Detected WSL. Using chromium.');
    headlessBrowser = await plugins.puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
      ]
    });
  }

  return headlessBrowser;
};
