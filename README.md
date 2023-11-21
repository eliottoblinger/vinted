# @eliottoblinger/vinted

A simple npm package to interact with Vinted.

## Installation

You can install this package using npm:

```bash
npm install @eliottoblinger/vinted
```

## Usage

```js
import { Vinted } from '@eliottoblinger/vinted';

const vintedInstance = new Vinted();

// Set proxies if needed
vintedInstance.setProxies(['proxy1', 'proxy2']);

// Get available brands
const brands = await vintedInstance.getBrands();
console.log('Available brands:', brands);

// Perform a search
const searchOptions = {
  minPrice: 10,
  maxPrice: 50,
  limitPerPage: 10,
  // other options...
};

const searchResults = await vintedInstance.search({
  text: 'your search text',
  options: searchOptions,
});

console.log('Search Results:', searchResults.results);
console.log('Number of Pages:', searchResults.numberOfPages);
console.log('Current Page:', searchResults.currentPage);
console.log('Has Next Page:', searchResults.hasNext);

// Paginate through results
while (searchResults.hasNext) {
  await searchResults.next();
  console.log('Next Page Results:', searchResults.results);
}
```

## API Reference

### `Vinted`

#### `constructor(proxies?: string[])`

Creates a new Vinted instance.

#### `setProxies(proxies: string[])`

Sets the proxies for the Vinted instance.

#### `async getBrands(): Promise<any[]>`

Gets the available brands.

#### `async search({ text, options }): Promise<VintedSearch>`

Performs a search with the specified text and options.

- **Parameters:**
    - `text` (string): The search text.
    - `options` (object):
        - `minPrice` (number, optional): Minimum price filter.
        - `maxPrice` (number, optional): Maximum price filter.
        - `limitPerPage` (number, optional): Results per page.
        - `brandsIds` (array, optional): Array of brand IDs.
        - `orderBy` (string, optional): Sorting order.
        - `userId` (string, optional): User ID for user-specific searches.

### `VintedSearch`

#### `async next(): Promise<VintedSearch>`

Moves to the next page of search results.

## Proxy Configuration

When setting proxies using the `setProxies` method, ensure that they are provided in the following format:

- `"{protocol}://{username}:{password}@{address_ip}:{port}"`

For example:

```javascript
const vintedInstance = new Vinted();

// Set proxies with authentication
vintedInstance.setProxies([
  "http://user1:pass1@proxy1.example.com:8080",
  "https://user2:pass2@proxy2.example.com:8080",
  "socks5://user3:pass3@proxy3.example.com:8080",
]);
```
