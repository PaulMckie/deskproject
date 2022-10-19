interface IUtility {
  range: (min: number, max: number) => number[];
}

export const utils: IUtility = {
  range: (min: number, max: number) =>
    Array.from({ length: max - min + 1 }, (_, i) => min + i),
};
