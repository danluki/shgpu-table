import connection from "../connection";

class Repository {
  async createGroup(
    groupName: string,
    groupDescription: string
  ): Promise<number> {
    try {
      return (await connection).execute(
        `INSERT INTO 'groups' (group_name, group_description) VALUES ('${groupName}', '${groupDescription}');`
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Repository();
