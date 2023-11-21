import {DEFAULT_SEARCH_OPTIONS, TVintedOptions, VintedApiRoute} from "./types";
import {VintedSearch} from "./VintedSearch";
import {fetchResults} from "./utils";

export class Vinted {
    private proxies: string[];
    private brands: any[];

    constructor(proxies?: string[]){
        this.proxies = proxies ?? [];
        this.brands = [];
    }

    private optionsAreNotValid(options: TVintedOptions){
        const priceRangeIsNotValid =
            (options.minPrice && options.minPrice < 0)
            ||  (options.maxPrice && options.maxPrice <= 0)
            || (options.minPrice && options.maxPrice && options.minPrice > options.maxPrice);

        const limitPerPageIsNotValid = !options.limitPerPage || options.limitPerPage <= 0;

        if(
          priceRangeIsNotValid
          || limitPerPageIsNotValid
        )
            return true;

        return false;
    }

    setProxies(proxies: string[]){
        this.proxies = proxies;
    }

    async getBrands(){
        if(!this.brands.length) {
            const results = await fetchResults({
                url: VintedApiRoute.Brands,
                proxies: this.proxies
            });

            if(!results) throw new Error('Cannot get brands');

            this.brands = results.brands;
        }

        return this.brands;
    }

    async search({
        text,
        options = DEFAULT_SEARCH_OPTIONS
    }: {
        text: string,
        options?: TVintedOptions
    }): Promise<VintedSearch>{
        const globalOptions: TVintedOptions = {
            ...DEFAULT_SEARCH_OPTIONS,
            ...options
        }

        if(this.optionsAreNotValid(globalOptions)) throw new Error('Options are not valid');

        const vintedSearch: VintedSearch = new VintedSearch({
            text: text,
            options: globalOptions,
            proxies: this.proxies
        });

        return await vintedSearch.process();
    }
}