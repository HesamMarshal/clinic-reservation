export const createSlug = (str: string) => {
  return str
    ?.replace(/[،:ًٌٍ\.\+\-_)(*&^%$#@!?;:><]+/g, "")
    ?.replace(/[\s]+/g, "-")
    .toLowerCase();
};

export const randomId = () => Math.random().toString(36).substring(2);
