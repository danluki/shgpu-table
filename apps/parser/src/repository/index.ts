import { addDays } from "date-fns";
import { DatabaseError } from "pg";
import { Pair, PublicFaculty } from "@shgpu-table/shared/src/index";
import {
  AppDataSource,
  Between,
  DataSource,
  QueryFailedError,
} from "@shgpu-table/typeorm";
import { Faculty as FacultyEntity } from "@shgpu-table/typeorm/entities/faculty";
import { Group } from "@shgpu-table/typeorm/entities/group";
import { Pair as PairEntity } from "@shgpu-table/typeorm/entities/pair";
import { FacultyId } from "../parsers/constants";

class Repository {
  private typeorm: DataSource;

  public async connect() {
    this.typeorm = await AppDataSource.initialize();
  }

  public async getFaculty(id: number): Promise<FacultyEntity> {
    const faculty = await this.typeorm.getRepository(FacultyEntity).findOneBy({
      id: id,
    });
    return faculty;
  }

  public async getFaculties(): Promise<PublicFaculty[]> {
    const faculties = await this.typeorm.getRepository(FacultyEntity).find();

    return faculties;
  }

  public async getPairsByInstructor(
    instructor: string,
    begin: Date,
    end: Date
  ): Promise<Pair[]> {
    const pairs = await this.typeorm
      .getRepository(PairEntity)
      .query(
        `SELECT * FROM pairs WHERE regexp_like(name, '.*${instructor}\\s.*', 'i') AND date >= '${begin.toISOString()}' AND date <= '${end.toISOString()}' ORDER BY date ASC;`
      );
    const dtoPairs: Pair[] = [];
    pairs.forEach((pair: any) => {
      dtoPairs.push({
        ...pair,
        date: new Date(pair.date).toISOString(),
      });
    });
    return dtoPairs;
  }
  public async getPairsByDays(
    groupName: string,
    currentDate: Date,
    offset: number,
    count: number
  ) {
    const startDate = addDays(currentDate, offset);
    const endDate = addDays(startDate, count - 1);

    const pairs = await this.typeorm.getRepository(PairEntity).find({
      order: {
        date: "ASC",
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
        date: Between(startDate, endDate),
      },
    });

    const dtoPairs: Pair[] = [];
    pairs.forEach((pair) => {
      dtoPairs.push({
        ...pair,
        date: new Date(pair.date).toISOString(),
      });
    });
    return dtoPairs;
  }

  public async getGroup(groupName: string): Promise<Group> {
    const group = await this.typeorm.getRepository(Group).findOne({
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
  ): Promise<Pair[]> {
    const pairs = await this.typeorm.getRepository(PairEntity).find({
      order: {
        date: "ASC",
        number: "ASC",
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
      // relations: {
      //   faculty: true,
      // },
    });
    const dtoPairs: Pair[] = [];
    pairs.forEach((pair) => {
      dtoPairs.push({
        ...pair,
        date: new Date(pair.date).toISOString(),
      });
    });
    return dtoPairs;
  }

  public async addPair(pair: Pair) {
    const dbPair = new PairEntity();
    try {
      const faculty = await this.typeorm.getRepository(FacultyEntity).findOne({
        where: {
          id: pair.faculty.id,
        },
      });

      if (!faculty) {
        throw new Error("Can't find faculty for pair");
      }

      dbPair.name = pair.name;
      dbPair.number = pair.number;
      dbPair.date = new Date(pair.date);
      dbPair.day = pair.day;
      dbPair.faculty = faculty;
      dbPair.groupName = pair.groupName;

      await this.typeorm.getRepository(PairEntity).save(dbPair);
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
      const ds = this.typeorm.getRepository(PairEntity);
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

export default Repository;
