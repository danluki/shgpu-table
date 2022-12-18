import { DatabaseError } from "pg";
import { DataSource } from "typeorm";
import { Pair } from "../../../../libs/models/parser";
import { AppDataSource, QueryFailedError } from "../../../../libs/typeorm/src";
import { Pair as PairEntity } from "../../../../libs/typeorm/src/entities/pair";
import { FacultyId } from "../parsers/constants";

class Repository {
  private readonly datasource: DataSource = AppDataSource;

  public async addPair(pair: Pair) {
    const dbPair = new PairEntity();
    try {
      dbPair.name = pair.name;
      dbPair.number = pair.number;
      dbPair.date = pair.date.toDateString();
      dbPair.day = pair.day;
      dbPair.faculty = pair.faculty;
      dbPair.groupName = pair.groupName;

      await AppDataSource.getRepository(PairEntity).save(dbPair);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        const e = err.driverError as DatabaseError;
        if (e.code === "23505") {
          return;
        }
      }
      console.log(err);
      throw err;
    }
  }

  public async removePairs(beginDate: Date, endDate: Date, faculty: FacultyId) {
    try {
      const ds = AppDataSource.getRepository(PairEntity);
      await ds
        .createQueryBuilder("pairs")
        .delete()
        .from(PairEntity)
        .where(
          "facultyId = :facultyId AND date >= :beginDate AND date <= :endDate",
          { facultyId: faculty, beginDate, endDate }
        )
        .execute();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new Repository();
