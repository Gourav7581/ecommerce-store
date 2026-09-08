import { FunctionUrl } from './Service api/Functionurl';

test('uses the products API endpoint', () => {
  expect(FunctionUrl.Product).toBe('/products');
});
