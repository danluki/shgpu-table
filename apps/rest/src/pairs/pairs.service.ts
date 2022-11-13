import { GroupDto } from '../groups/dtos/group.dto';
import { PairDto } from './dtos/pair.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { DataSource } from 'typeorm';
import { addDays } from 'date-fns';
import { ScheduleDto } from './dtos/schedule.dto';
@Injectable()
export class PairsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private groupsService: GroupsService,
  ) {}

  async getPairsByIdAndDate(
    groupId: number,
    beginDate: Date,
    endDate: Date,
  ): Promise<PairDto[]> {
    const pairs = await this.dataSource.query(
      'SELECT * FROM pairs WHERE group_id = $1 AND date >= $2 AND date <= $3 ORDER BY day ASC;',
      [groupId, beginDate, endDate],
    );

    return pairs;
  }

  async getPairsByNameAndDate(
    groupName: string,
    beginDate: Date,
    endDate: Date,
  ): Promise<PairDto[]> {
    const group: GroupDto = await this.groupsService.getGroupByName(groupName);
    return await this.getPairsByIdAndDate(group.id, beginDate, endDate);
  }

  async getPairsByIdAndDayOffsetAndCount(
    groupId: number,
    daysOffset: number,
    daysCount: number,
  ): Promise<PairDto[]> {
    const { beginDate, endDate } = this.countDates(daysOffset, daysCount);
    return await this.getPairsByIdAndDate(groupId, beginDate, endDate);
  }

  async getPairsByNameAndDayOffsetAndCount(
    groupName: string,
    daysOffset: number,
    daysCount: number,
  ): Promise<PairDto[]> {
    const group: GroupDto = await this.groupsService.getGroupByName(groupName);
    const { beginDate, endDate } = this.countDates(daysOffset, daysCount);
    return await this.getPairsByIdAndDate(group.id, beginDate, endDate);
  }

  async getPairsByInstructorName(name: string): Promise<PairDto[]> {
    console.log(name);
    const pairs = await this.dataSource.query(
      `SELECT * FROM pairs WHERE regexp_like(name, '.*${name}\\s.*', 'i') ORDER BY day ASC;`,
    );
    return pairs;
  }

  async getSchedule(): Promise<ScheduleDto[]> {
    return await this.dataSource.query('SELECT * FROM time_table;');
  }

  // async getLink(facultyId: number): Promise<string>{

  // }

  private countDates(daysOffset: number, daysCount: number): any {
    const currentDate = new Date();
    const beginDate = addDays(currentDate, daysOffset);
    const endDate = addDays(beginDate, daysCount);

    return { beginDate, endDate };
  }
}
