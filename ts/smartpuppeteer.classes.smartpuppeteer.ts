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
    chromeArgs = chromeArgs.concat(['--no-sandbox', '--disable-setuid-sandbox']);
  } else if (smartenv.isWsl) {
    console.log('Detected WSL.');
    chromeArgs = chromeArgs.concat(['--no-sandbox', '--single-process']);
  }

  let headlessBrowser: plugins.puppeteer.Browser;
  console.log('launching puppeteer bundled chrome with arguments:');
  console.log(chromeArgs);
  headlessBrowser = await plugins.puppeteer.launch({
    args: chromeArgs
  });

  return headlessBrowser;
};
