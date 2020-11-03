export function addBetween<T, U>(
  arr: Array<T>,
  create: (indexBefore: number, indexAfter: number) => U
): Array<T | U> {
  const result: Array<T | U> = [];
  arr.forEach((item, index) => {
    if (index > 0) {
      result.push(create(index - 1, index));
    }
    result.push(item);
  });
  return result;
}

export function notNil<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error(`Unexpected nil value`);
  }
  return value;
}

export function wait(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
