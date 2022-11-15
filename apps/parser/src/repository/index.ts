import { DuplicatePairsError } from "./../exceptions/DuplicatePairsError";
import { DBError, UniqueViolationError, wrapError } from "db-errors";
import { FacultiesIds } from "../constraints/faculties";
import pool from "../db/connection";
import connection from "../db/connection";
import { CriticalError } from "../exceptions/CriticalError";
import { logger } from "../logger";
import { Pair } from "../models/models";

class Repository {
  async getGroupId(groupName: string): Promise<number> {
    const { rows } = await pool.query(
      "SELECT id FROM groups WHERE name = $1;",
      [groupName]
    );

    return rows[0].id;
  }

  async addPair(
    pair: Pair,
    group_id: number,
    faculty_id: number
  ): Promise<void> {
    try {
      switch (faculty_id) {
        case FacultiesIds.GYM:
          await pool.query(
            "INSERT INTO gym_pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
          );
          break;
        case FacultiesIds.COLLEGE:
          await pool.query(
            "INSERT INTO college_pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
          );
          break;
        case FacultiesIds.ITIEN:
          await pool.query(
            "INSERT INTO itien_pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
          );
          break;
        case FacultiesIds.PE:
          await pool.query(
            "INSERT INTO pe_pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
          );
          break;
        case FacultiesIds.PSYCHO:
          await pool.query(
            "INSERT INTO psycho_pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
            [pair.name, pair.number, pair.day, pair.date, group_id, faculty_id]
          );
          break;
      }
    } catch (error) {
      const e = wrapError(error);

      if (e instanceof UniqueViolationError) {
        return;
      }

      throw new DBError();
    }
  }

  async deletePairs(faculty_id: number): Promise<void> {
    try {
      switch (faculty_id) {
        case FacultiesIds.GYM:
          const res = await pool.query("TRUNCATE TABLE gym_pairs;");
          break;
        case FacultiesIds.COLLEGE:
          await pool.query("TRUNCATE TABLE college_pairs;");
          break;
        case FacultiesIds.ITIEN:
          await pool.query("TRUNCATE TABLE itien_pairs;");
          break;
        case FacultiesIds.PE:
          await pool.query("TRUNCATE TABLE pe_pairs;");
          break;
        case FacultiesIds.PSYCHO:
          await pool.query("TRUNCATE TABLE psycho_pairs;");
          break;
      }
    } catch (error) {
      throw new DBError();
    }
  }
}

export default new Repository();
