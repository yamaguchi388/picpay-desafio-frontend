export function joinAndLowerCase(text: string): string {
  return text.split(' ').join('').toLocaleLowerCase();
}
