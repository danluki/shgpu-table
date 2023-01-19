export const getTableNameFromLink = (link: string): string => {
    return link.split("/").pop();
};