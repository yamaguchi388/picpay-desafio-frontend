type DataStore = {
  data: unknown;
  expire?: number;
};

const isLocalStorageEnabled = (() => {
  try {
    localStorage.setItem("t", "v");
    localStorage.removeItem("t");
    return true;
  } catch (error) {
    return false;
  }
})();

export const get = (key: string): unknown => {
  if (!isLocalStorageEnabled) {
    return null;
  }

  const rawData = localStorage.getItem(key);

  if (!rawData) {
    return null;
  }

  const { expire, data } = JSON.parse(rawData);

  const isExpired = expire && expire < Date.now();

  if (isExpired) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

export const set = (
  key: string,
  data: unknown,
  expereIn: number | null = null
): unknown => {
  if (!isLocalStorageEnabled) {
    return null;
  }

  const payload: DataStore = { data };

  if (expereIn) {
    payload.expire = Date.now() + 1000 * expereIn;
  }

  localStorage.setItem(key, JSON.stringify(payload));
};

const remove = (key: string): void => localStorage.removeItem(key);

export const clear = (): void => localStorage.clear();
