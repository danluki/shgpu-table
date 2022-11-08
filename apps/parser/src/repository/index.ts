import pool from "../db/connection";
import connection from "../db/connection";
import { CriticalError } from "../exceptions/CriticalError";
import { logger } from "../logger";
import { Pair } from "../models/models";

class Repository {
  async getGroupId(groupName: string): Promise<number> {
    try {
      const { rows } = await pool.query(
        "SELECT id FROM groups WHERE name = $1;",
        [groupName]
      );

      return rows[0].id;
    } catch (error) {
      logger.error("Can't get group id.", error);
    }
  }

  async addPair(
    pair: Pair,
    group_id: number,
    faculty_id: number
  ): Promise<void> {
    try {
      const res = await pool.query(
        "INSERT INTO pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
        [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
      );
    } catch (error) {
      throw new CriticalError(
        "Adding new pair has been failed, so parser is broken.",
        error
      );
    }
  }

  async deletePairs(facultyId: number): Promise<void> {
    try {
      await pool.query("DELETE FROM pairs WHERE faculty_id = $1;", [facultyId]);
    } catch (error) {
      throw new CriticalError(
        "Adding new pair has been failed, so parser is broken.",
        error
      );
    }
  }
}

export default new Repository();
