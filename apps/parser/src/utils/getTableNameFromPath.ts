import { GettingNameFromPathError } from "../exceptions/GettingNameFromPathError";

export const getTableNameFromPath = (path: string) => {
  if (!path) throw new GettingNameFromPathError();

  const tableName = path.split("/").pop();
  return tableName;
};
