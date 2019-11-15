import puppeteer from 'puppeteer';

export interface IEnvAwareOptions {
  forceNoSandbox?: boolean;
}

export const getEnvAwareBrowserInstance = async (optionsArg: IEnvAwareOptions = {}): Promise<puppeteer.Browser> => {
  const options: IEnvAwareOptions = {
    ...{
      forceNoSandbox: false
    },
    ...optionsArg
  }
  
  let chromeArgs: string[] = [];
  if (process.env.CI || options.forceNoSandbox) {
    chromeArgs = chromeArgs.concat(['--no-sandbox', '--disable-setuid-sandbox']);
  }
  const headlessBrowser = await puppeteer.launch({
    args: chromeArgs
  });
  return headlessBrowser;
};

export { puppeteer };
