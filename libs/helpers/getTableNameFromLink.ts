export const getTableNameFromLink = (link: string): string | null => {
  return link.split("/").pop() ?? null;
};
