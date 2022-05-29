export function objectToQueryString<Type>(object: Type): string {
  if (!object) return '';
  const queryString = Object.keys(object)
    .filter((key) => object[key])
    .map((key) => `${key}=${object[key]}`)
    .join('&');
  return `?${queryString}`;
}
