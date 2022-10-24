export const getTableNameFromPath = (path: string) => {
  const tableName = path.split("/").pop();
  return tableName;
};
