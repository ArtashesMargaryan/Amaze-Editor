export type BoardConfig = {
  size: {
    x: number;
    y: number;
  };
};

export type Ways = Points[];

export type Points = { i: number; j: number; entryPoint?: boolean }[];
