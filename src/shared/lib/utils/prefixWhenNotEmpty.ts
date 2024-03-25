export const prefixWhenNotEmpty = <TValue>(
  value?: TValue,
  prefix?: string
): TValue | string | undefined => (value ? `${prefix}${value}` : value);
