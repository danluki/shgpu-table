import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { DataSource } from 'typeorm';

@Injectable()
export class PairsService {
  constructor(@InjectDataSource() private dataSource: DataSource, private groupsService: GroupsService) {}

  async getPairs(groupId: number, beginDate: Date, endDate: Date) {
    const pairs = await this.dataSource.query(
      'SELECT * FROM pairs WHERE group_id = $1 AND date >= $2 AND date <= $3 ORDER BY date ASC, day ASC;',
      [groupId, beginDate, endDate],
    );
    return pairs;
  }

  async getPairs(groupName: string, beginDate: Date, endDate: Date) {
    const groupId = 
  }
}
