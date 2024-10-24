export const createSlug = (str: string) => {
  return str
    ?.replace(/[،:ًٌٍ\.\+\-_)(*&^%$#@!?;:><]+/g, "")
    ?.replace(/[\s]+/g, "-")
    .toLowerCase();
};

export const randomId = () => Math.random().toString(36).substring(2);

export const isTrue = (value) => ["true", "True", 1, true].includes(value);
export const isFalse = (value) => ["false", "False", 0, false].includes(value);
