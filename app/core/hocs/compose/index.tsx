export const compose = (...functions: Function[]) => {
  if (functions.length === 0) {
    return (arg: any) => arg;
  }
  if (functions.length === 1) {
    return functions[0];
  }
  return functions.reduce(
    (a, b) =>
      (...args: unknown[]) =>
        a(b(...args))
  );
};
