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
    const currentDate = new Date('YYYY-MM-DD');

    const startDate = addDays(currentDate, daysOffset);
  }
}
