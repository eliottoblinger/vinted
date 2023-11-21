import {Vinted, TVintedResult, VintedSearch} from "../src";
import 'dotenv/config';

export const searchWithProxies = async(text: string): Promise<TVintedResult[]> => {
  const proxies: string[] = [];

  for(let i: number = 1; i <= 18; i++) proxies.push(process.env[`PROXY_${i}`]!);

  const vinted: Vinted = new Vinted(proxies);

  const results: TVintedResult[] = [];

  const vintedSearch: VintedSearch = await vinted.search({
    text: text
  });

  results.push(...vintedSearch.results);

  while(vintedSearch.hasNext){
    await vintedSearch.next();

    results.push(...vintedSearch.results);
  }

  return results;
}