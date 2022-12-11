export const getTableNameFromLink = (link: string) => {
  const tableName = link.split("/").pop();
};
