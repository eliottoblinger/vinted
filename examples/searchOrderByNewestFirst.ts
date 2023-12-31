import {Vinted, TVintedOptions, TVintedResult, VintedOrderBy, VintedSearch} from "../src";

export const searchOrderByNewestFirst = async(text: string): Promise<TVintedResult[]> => {
  const vinted: Vinted = new Vinted();

  const results: TVintedResult[] = [];

  const options: TVintedOptions = {
      orderBy: VintedOrderBy.NewestFirst
  }

  const vintedSearch: VintedSearch = await vinted.search({
    text: text,
    options: options
  });

  results.push(...vintedSearch.results);

  while(vintedSearch.hasNext){
    await vintedSearch.next();

    results.push(...vintedSearch.results);
  }

  return results;
}