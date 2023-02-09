export const getTableNameFromLink = (link: string): string => {
    const res = link.split("/").pop()
    if (!res) {
        throw new Error("Wrong link format");
    }
    return res;
};