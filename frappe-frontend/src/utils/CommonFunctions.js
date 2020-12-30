export const getNameFromId = (id, data, keyName) => {
  const item = data.find((i) => i[keyName] === id);
  return item.name;
};
