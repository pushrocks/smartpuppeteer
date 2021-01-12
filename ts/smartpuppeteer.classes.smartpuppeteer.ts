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
      forceNoSandbox: false,
    },
    ...optionsArg,
  };

  let chromeArgs: string[] = [];
  if (process.env.CI || options.forceNoSandbox || plugins.os.userInfo().username === 'root') {
    chromeArgs = chromeArgs.concat(['--no-sandbox', '--disable-setuid-sandbox']);
  }

  let headlessBrowser: plugins.puppeteer.Browser;
  console.log('launching puppeteer bundled chrome with arguments:');
  console.log(chromeArgs);
  headlessBrowser = await plugins.puppeteer.launch({
    args: chromeArgs,
    pipe: true
  });

  return headlessBrowser;
};
