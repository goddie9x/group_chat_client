declare global {
  type TDict<T> = Record<string, T>;

  type Opt<T> = T | null | undefined;
}

export {};
