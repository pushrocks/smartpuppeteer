import puppeteer from 'puppeteer';

export const getEnvAwareBrowserInstance = async (): Promise<puppeteer.Browser> => {
  let chromeArgs: string[] = [];
  if (process.env.CI) {
    chromeArgs = chromeArgs.concat(['--no-sandbox', '--disable-setuid-sandbox']);
  }
  const headlessBrowser = await puppeteer.launch({
    args: chromeArgs
  });
  return headlessBrowser;
};

export { puppeteer };
