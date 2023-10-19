export const storeData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.debug(`Could not set localStorage item (${key})`, e);
  }
};

export const readData = <T>(
  key: string,
  fallbackValue: T | null = null
): T | null => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallbackValue;
  } catch (e) {
    console.debug(`Could not parse localStorage item (${key})`, e);
    return fallbackValue;
  }
};
