export type NonEmptyArray<T> = [T, ...T[]];

export const isNonEmptyArray = <T>(array: T[]): array is NonEmptyArray<T> => array.length > 0;
