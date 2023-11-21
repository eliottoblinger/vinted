import { Vinted, VintedApiRoute } from '../src';
import { fetchResults } from '../src/utils';

jest.mock('../src/utils', () => ({
  fetchResults: jest.fn(),
}));

describe('Vinted Class Tests', () => {
  let vintedInstance: Vinted;

  beforeEach(() => {
    vintedInstance = new Vinted();
  });

  test('Vinted class should be instantiated', () => {
    expect(vintedInstance).toBeInstanceOf(Vinted);
  });

  test('Set Proxies should update the proxies array', () => {
    const newProxies = ['proxy1', 'proxy2'];
    vintedInstance.setProxies(newProxies);
    expect(vintedInstance['proxies']).toEqual(newProxies);
  });

  test('Options Are Not Valid should return true for invalid options', () => {
    const invalidOptions = {
      minPrice: 100,
      maxPrice: 50,
      limitPerPage: 0,
    };
    const result = vintedInstance['optionsAreNotValid'](invalidOptions);
    expect(result).toBe(true);
  });

  test('Options Are Not Valid should return false for valid options', () => {
    const validOptions = {
      minPrice: 10,
      maxPrice: 50,
      limitPerPage: 10,
    };
    const result = vintedInstance['optionsAreNotValid'](validOptions);
    expect(result).toBe(false);
  });

  test('Set Proxies should update the proxies array', () => {
    const newProxies = ['proxy1', 'proxy2'];
    vintedInstance.setProxies(newProxies);
    expect(vintedInstance['proxies']).toEqual(newProxies);
  });

  test('Get Brands should fetch and update the brands array', async () => {
    const mockBrands = [{ id: 1, name: 'Brand1' }, { id: 2, name: 'Brand2' }];
    (fetchResults as jest.Mock).mockResolvedValueOnce({ brands: mockBrands });

    await vintedInstance.getBrands();

    expect(fetchResults).toHaveBeenCalledWith({
      url: VintedApiRoute.Brands,
      proxies: [],
    });
    expect(vintedInstance['brands']).toEqual(mockBrands);
  });

  test('Get Brands should throw an error if fetching fails', async () => {
    (fetchResults as jest.Mock).mockResolvedValueOnce(null);

    await expect(vintedInstance.getBrands()).rejects.toThrow('Cannot get brands');
  });

  test('Search method should create and return a VintedSearch instance', async () => {
    const searchOptions = { minPrice: 10, maxPrice: 50, limitPerPage: 5 };
    const searchResults = [{ title: 'Item1', price: 30 }, { title: 'Item2', price: 40 }];

    (fetchResults as jest.Mock).mockResolvedValueOnce({ items: searchResults, pagination: { total_pages: 1 } });

    const vintedSearchInstance = await vintedInstance.search({
      text: 'searchText',
      options: searchOptions,
    });

    expect(vintedSearchInstance).toBeDefined();
    expect(vintedSearchInstance['text']).toBe('searchText');
    expect(vintedSearchInstance['options']).toEqual(expect.objectContaining(searchOptions));
    expect(vintedSearchInstance['proxies']).toEqual([]);
  });

  test('Search method should throw an error if options are not valid', async () => {
    const invalidOptions = { minPrice: 50, maxPrice: 40, limitPerPage: 5 };

    await expect(vintedInstance.search({ text: 'searchText', options: invalidOptions })).rejects.toThrow('Options are not valid');
  });
});
