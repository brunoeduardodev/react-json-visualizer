export const isValid = (data: string | object) => {
  if (typeof data === "object") return true;

  try {
    JSON.parse(data);
    return true;
  } catch (err) {
    return false;
  }
};
