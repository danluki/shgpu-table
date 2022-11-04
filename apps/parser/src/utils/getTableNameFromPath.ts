export const getTableNameFromPath = (path: string) => {
  if (!path) return null;
  
  const tableName = path.split("/").pop();
  return tableName;
};
