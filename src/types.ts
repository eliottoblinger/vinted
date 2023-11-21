const VINTED_API_URL = 'https://www.vinted.fr/api/v2/';
export const WEBSITE_URL = 'https://www.vinted.fr/';

export type TVintedOptions = {
    orderBy?: VintedOrderBy,
    brandsIds?: number[],
    minPrice?: number,
    maxPrice?: number,
    limitPerPage?: number,
    userId?: number
}

export type TVintedBrand = {
    id: number,
    title: string,
    slug: string,
    favourite_count: number,
    pretty_favourite_count: string,
    item_count: number,
    pretty_item_count: string,
    is_visible_in_listings: boolean,
    requires_authenticity_check: boolean,
    is_luxury: boolean,
    path: string,
    url: string,
    is_favourite: boolean
}

export type TVintedUser = {
    id: number,
    login: string,
    business: boolean,
    profile_url: string,
    photo: Object
}

export type TVintedPhoto = {
    id: number,
    image_no: number,
    width: number,
    height: number,
    dominant_color: string,
    dominant_color_opaque: string,
    url: string,
    is_main: boolean,
    thumbnails: [],
    high_resolution: Object,
    is_suspicious: boolean,
    full_size_url: string,
    is_hidden: boolean,
    extra: Object
}

export type TVintedResult = {
    id: number,
    title: string,
    price: string,
    is_visible: number,
    discount?: boolean,
    currency: string,
    brand_title: string,
    is_for_swap: boolean,
    user: TVintedUser,
    url: string,
    promoted: boolean,
    photo: TVintedPhoto,
    favourite_count: number,
    is_favourite: boolean,
    badge?: boolean,
    conversion?: boolean,
    service_fee: string,
    total_item_price: string,
    view_count: number,
    size_title: string,
    content_source: string,
    search_tracking_params: { score: number, matched_queries?: string[] }
}

export enum VintedApiRoute {
    Search = `${VINTED_API_URL}catalog/items`,
    Users = `${VINTED_API_URL}users`,
    Brands = `${VINTED_API_URL}brands`
}

export enum VintedOrderBy {
    Relevance = 'relevance',
    PriceLowToHigh = 'price_low_to_high',
    PriceHighToLow = 'price_high_to_low',
    NewestFirst = 'newest_first'
}

export const DEFAULT_SEARCH_OPTIONS: TVintedOptions = {
    orderBy: VintedOrderBy.Relevance,
    brandsIds: [],
    minPrice: undefined,
    maxPrice: undefined,
    limitPerPage: 96,
    userId: undefined
}