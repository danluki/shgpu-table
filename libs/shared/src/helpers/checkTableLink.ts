export const checkTableNameLink = (link: string): boolean => {
    if (!link) return false;
    const regex = new RegExp(/https:\/\/.+\/.+\/f\d{2}\/.+\/.+\.xls/i);
    return link.match(regex) ? true : false;
};