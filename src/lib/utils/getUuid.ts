export const getUuid = (value: string): string => {
  const UUID_PATERN =
    /([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{12})[\/]?/g;
  const extractedId = UUID_PATERN.exec(value);
  if (extractedId) {
    return extractedId[1];
  }
  return "";
};
