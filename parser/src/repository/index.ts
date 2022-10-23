import pool from "../db/connection";
import connection from "../db/connection";
import { Pair } from "../models/models";

class Repository {
  async createGroup(
    groupName: string,
    groupDescription: string
  ): Promise<number> {
    return new Promise((resolve, reject) => {
      //connection.execute("INSERT INTO `pairs` ()");
    });
  }

  async getGroupId(groupName: string): Promise<number> {
    try {
      const { rows } = await pool.query(
        "SELECT id FROM groups WHERE name = $1;",
        [groupName]
      );
      
      return rows[0].id;
    } catch (err) {
      console.log(err);
    }
  }

  async addPair(pair: Pair, group_id: number): Promise<void> {
    try {
      const { rows } = await pool.query(
        "INSERT INTO pairs (instructor, name, number, day, date, group_id) VALUES ($1, $2, $3, $4, $5, $6);",
        [pair.instructor, pair.name, pair.number, pair.day, pair.date, group_id]
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Repository();
