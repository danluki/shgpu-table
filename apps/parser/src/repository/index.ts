import { DatabaseError } from "pg";
import { DataSource } from "typeorm";
import { Pair } from "../../../../libs/models/parser";
import {
  AppDataSource,
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  QueryFailedError,
} from "../../../../libs/typeorm/src";
import { Faculty } from "../../../../libs/typeorm/src/entities/faculty";
import { Group } from "../../../../libs/typeorm/src/entities/group";
import { Pair as PairEntity } from "../../../../libs/typeorm/src/entities/pair";
import { FacultyId } from "../parsers/constants";

class Repository {
  private readonly datasource: DataSource = AppDataSource;

  public async getGroup(groupName: string): Promise<Group> {
    const group = await AppDataSource.getRepository(Group).findOne({
      where: { name: groupName },
      relations: {
        faculty: true,
      },
    });

    return group;
  }

  public async getPairsByDates(
    groupName: string,
    begin: Date,
    end: Date
  ): Promise<any> {
    const pairs = await AppDataSource.getRepository(PairEntity).find({
      order: {
        date: "DESC",
      },
      select: {
        name: true,
        number: true,
        day: true,
        groupName: true,
        date: true,
      },
      where: {
        groupName: groupName,
        date: Between(begin, end),
      },
      relations: {
        faculty: true,
      },
    });

    return pairs;
  }

  public async addPair(pair: Pair) {
    const dbPair = new PairEntity();
    try {
      const faculty = await AppDataSource.getRepository(Faculty).findOne({
        where: {
          id: pair.faculty.id,
        },
      });

      if (!faculty) {
        throw new Error("Can't find faculty for pair");
      }

      dbPair.name = pair.name;
      dbPair.number = pair.number;
      dbPair.date = pair.date;
      dbPair.day = pair.day;
      dbPair.faculty = faculty;
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
