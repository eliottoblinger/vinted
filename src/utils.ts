import {getProxy} from "./puppeteer/utils";
import {fetchThroughBrowser} from "./puppeteer";
import {WEBSITE_URL} from "./types";

export const fetchResults = async({
  url,
  proxies
}: {
  url: string,
  proxies: string[]
}) =>{
  let results = undefined;
  const proxiesUsed: string[] = [];

  do{
    const proxy = getProxy({
      proxies: proxies
    });

    results = await fetchThroughBrowser({
      proxy: proxy?.proxy,
      browserUrl: WEBSITE_URL,
      url: url
    });

    if(proxy) proxiesUsed.push(proxy.proxyUsed);

    proxies = proxies.filter(p => !proxiesUsed.includes(p));
  }while(proxies.length && !results);

  return results;
}