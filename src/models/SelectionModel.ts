export type SelectionModel =
  | (string | number)[]
  | {
      type: "include" | "exclude";
      ids: Set<string | number>;
    };