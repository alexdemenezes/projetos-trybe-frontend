export async function getCategories() {
  const requestApi = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const translatedRequest = await requestApi.json();
  return translatedRequest;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const API_QUERY_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const API_CATEGORY_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const API_CATEGORY_QUERY_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  let resultApi;
  if (categoryId && query) {
    resultApi = await fetch(API_CATEGORY_QUERY_URL);
  } else if (categoryId) {
    resultApi = await fetch(API_CATEGORY_URL);
  } else {
    resultApi = await fetch(API_QUERY_URL);
  }

  const translated = resultApi.json();
  return translated;
}
