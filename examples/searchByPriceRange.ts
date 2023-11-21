import {Vinted, TVintedOptions, TVintedResult, VintedSearch} from "../src";

export const searchByPriceRange = async(text: string, priceRange: {min: number, max: number} = {min: 0, max: 100}): Promise<TVintedResult[]> => {
  const vinted: Vinted = new Vinted();

  const results: TVintedResult[] = [];

  const options: TVintedOptions = {
    minPrice: priceRange.min,
    maxPrice: priceRange.max
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