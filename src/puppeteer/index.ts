import {executablePath, PuppeteerLaunchOptions} from "puppeteer";
import puppeteer from "puppeteer-extra";
import UserAgent from "user-agents";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {TProxy} from "./types";

puppeteer.use(StealthPlugin());

export const fetchThroughBrowser = async ({
  proxy,
  browserUrl,
  url,
  headers,
  body,
  method
}: {
    proxy?: TProxy
    browserUrl: string,
    url: string,
    headers?: HeadersInit,
    body?: BodyInit,
    method?: string
}) => {
    const args = proxy
        ? [
            `--proxy-server=${proxy.url}`
        ]
        : [];

    const options: PuppeteerLaunchOptions = {
        executablePath: executablePath(),
        headless: 'new',
        args: args
    }

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    const userAgent = new UserAgent();

    if(
        proxy
        && proxy.username
        && proxy.password
    ){
        await page.authenticate({
            username: proxy.username,
            password: proxy.password
        });

        console.info(`Proxy ${proxy.url} is set`);
    }

    await page.setUserAgent(userAgent.random().toString());

    await page.goto(browserUrl, { waitUntil: 'networkidle0' });

    const response = await page.evaluate(async (url, headers, body, method) => {
        const response = await fetch(url, {
            headers: headers ?? {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            method: method ?? 'GET'
        });

        return await response.json();
    }, url, headers, body, method);

    await page.close();

    return response;
}