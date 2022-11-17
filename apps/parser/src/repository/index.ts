import { FacultiesIds } from "../constraints/faculties";
import pool from "../db/connection";
import logger from "../logger";
import { Faculty, Pair } from "../models/models";
import { QueryResult } from "pg";

class Repository {
  public async getFaculties(): Promise<Faculty[]> {
    return new Promise()
  }

  public async getGroupId(groupName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT id FROM groups WHERE name = $1;",
        [groupName],
        (err: Error, result: QueryResult) => {
          if (err) {
            return reject(err);
          }

          if (result.rowCount > 0) {
            return resolve(result.rows[0].id);
          } else {
            return resolve(null);
          }
        }
      );
    });
  }

  public addPair(
    pair: Pair,
    groupId: number,
    facultyId: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;",
        [pair.name, pair.number, pair.day, pair.date, groupId, facultyId],
        (err: any, result: QueryResult) => {
          if (err) {
            if (err.code === "23505") {
              return resolve("");
            }

            return resolve(err);
          }
          return resolve(result.rows[0].id);
        }
      );
    });
  }

  public async deletePairs(facultyId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      pool.query(
        "DELETE FROM pairs WHERE faculty_id = $1",
        [facultyId],
        (err: any, result: QueryResult) => {
          if (err) {
            return reject(err);
          }

          return resolve(result.rowCount);
        }
      );
    });
  }
}

export default new Repository();
