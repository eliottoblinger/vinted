import {VintedApiRoute, TVintedOptions, TVintedResult} from "./types";
import {fetchResults} from "./utils";

export class VintedSearch{
    public results: TVintedResult[];
    public numberOfPages: number;
    public currentPage: number;
    public hasNext: boolean;

    private readonly text: string;
    private options: TVintedOptions;
    private searchUrl: string;

    private readonly proxies: string[];

    constructor({
        text,
        options,
        proxies = []
    }: {
        text: string,
        options: TVintedOptions,
        proxies: string[]
    }){
        this.results = [];
        this.numberOfPages = 0;
        this.text = text;
        this.currentPage = 1;
        this.proxies = proxies;
        this.options = options;
        this.searchUrl = '';
        this.hasNext = false;
    }

    async process(): Promise<VintedSearch> {
        this.searchUrl = this.options.userId
          ? `${VintedApiRoute.Users}/${this.options.userId}/items?order=${this.options.orderBy}&per_page=${this.options.limitPerPage}`
          : `${VintedApiRoute.Search}?page=1&per_page=${this.options.limitPerPage}&search_text=${this.text.replaceAll(' ', '+')}&catalog_ids=${this.options.minPrice ? '&price_from=' + this.options.minPrice : ''}${this.options.maxPrice ? '&price_to=' + this.options.maxPrice : ''}&currency=EUR&color_ids=&brand_ids=${this.options.brandsIds && this.options.brandsIds.length ? this.options.brandsIds.toString() : ''}&size_ids=&material_ids=&video_game_rating_ids=&status_ids=&order=${this.options.orderBy}`;

        const results = await fetchResults({
            url: this.searchUrl,
            proxies: this.proxies
        });

        if(!results) throw new Error('Search failed');

        this.numberOfPages = results.pagination.total_pages;

        this.hasNext = this.numberOfPages > this.currentPage;

        this.results = results.items;

        return this;
    }

    async next(): Promise<VintedSearch>{
        this.currentPage++;

        const results = await fetchResults({
            url: `${this.searchUrl}&page=${this.currentPage}`,
            proxies: this.proxies
        });

        if(!results) throw new Error('Search failed');

        this.hasNext = this.numberOfPages > this.currentPage;

        this.results = results.items;

        return this;
    }
}