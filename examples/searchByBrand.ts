import {Vinted, TVintedBrand, TVintedOptions, TVintedResult, VintedSearch} from "../src";

export const searchByBrand = async(text: string, brand: string): Promise<TVintedResult[]> => {
  const vinted: Vinted = new Vinted();

  const results: TVintedResult[] = [];

  const brands: TVintedBrand[] = await vinted.getBrands();

  const brandId = brands.find(b => b.slug === brand)?.id;

  if(!brandId) throw new Error('Brand does not exists');

  const options: TVintedOptions = {
    brandsIds: [brandId]
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