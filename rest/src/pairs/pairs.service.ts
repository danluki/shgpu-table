import { GroupDto } from './../groups/dtos/group.dto';
import { PairDto } from './dtos/pair.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { DataSource } from 'typeorm';
import { addDays } from 'src/utils/addDays';

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
      'SELECT * FROM pairs WHERE group_id = $1 AND date >= $2 AND date <= $3 ORDER BY date ASC, day ASC;',
      [
        groupId,
        beginDate.toISOString().slice(0, 10),
        endDate.toISOString().slice(0, 10),
      ],
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
    const currentDate = new Date();
    console.log(currentDate);
    const beginDate = addDays(currentDate, daysOffset);
    const endDate = addDays(beginDate, daysCount);

    return await this.getPairsByIdAndDate(groupId, beginDate, endDate);
  }

  async getPairsByNameAndDayOffsetAndCount(
    groupName: string,
    daysOffset: number,
    daysCount: number,
  ): Promise<PairDto[]> {
    const group: GroupDto = await this.groupsService.getGroupByName(groupName);
    const currentDate = new Date();
    const beginDate = addDays(currentDate, daysOffset);
    console.log(beginDate);
    const endDate = addDays(beginDate, daysCount);

    return await this.getPairsByIdAndDate(group.id, beginDate, endDate);
  }
}
