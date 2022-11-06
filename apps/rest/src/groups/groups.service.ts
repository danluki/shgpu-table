import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GroupDto } from './dtos/group.dto';

@Injectable()
export class GroupsService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getGroupByName(groupName: string): Promise<GroupDto> {
    const res = await this.dataSource.query(
      'SELECT groups.id, faculties.name, faculties.id as faculty_id FROM groups JOIN faculties ON groups.faculty_id = faculties.id AND groups.name = $1;',
      [groupName],
    );
    if (!res[0])
      throw new HttpException(
        `Can't find group with name ${groupName}`,
        HttpStatus.BAD_REQUEST,
      );

    return res[0];
  }
}
