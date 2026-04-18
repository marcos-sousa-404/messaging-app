const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export default isNullOrUndefined;
