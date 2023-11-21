import {Vinted} from "../src/Vinted";
import {TVintedResult} from "../src/types";
import {VintedSearch} from "../src/VintedSearch";

export const search = async(text: string): Promise<TVintedResult[]> => {
  const vinted: Vinted = new Vinted();

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