import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GroupDto } from './dtos/group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getGroupByName(groupName: string): Promise<GroupDto> {
    const group = await this.dataSource.query(
      'SELECT * FROM groups WHERE name = $1 JOIN faculties ON groups.faculty_id = faculties.id',
      [groupName],
    );
    Logger.log(group);
    if (!group)
      throw new HttpException(
        "Can't find group with this name",
        HttpStatus.BAD_REQUEST,
      );

    return group;
  }
}
