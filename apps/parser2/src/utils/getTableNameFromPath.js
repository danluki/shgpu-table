import { GettingNameFromPathError } from "../exceptions/GettingNameFromPathError";
export const getTableNameFromPath = (path) => {
    if (!path)
        throw new GettingNameFromPathError();
    const tableName = path.split("/").pop();
    if (!tableName.includes(".xls"))
        throw new GettingNameFromPathError();
    return tableName;
};
//# sourceMappingURL=getTableNameFromPath.js.map