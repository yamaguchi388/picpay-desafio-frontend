export function objectToQueryString<Type>(object: Type): string {
  if (!object) return '';
  const queryString = Object.keys(object)
    .map((key) => `${key}=${object[key]}`)
    .join('&');
  return `?${queryString}`;
}
