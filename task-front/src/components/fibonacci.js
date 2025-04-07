export const generateFibonacci = (max) => {
  let fib = [1, 1];
  while (fib[fib.length - 1] <= max) {
    const next = fib[fib.length - 1] + fib[fib.length - 2];
    fib.push(next);
  }
  return new Set(fib);
};
