import { Controller, Get, Param } from '@nestjs/common';
import { GroupDto } from './dtos/group.dto';
import { GroupsService } from './groups.service';

@Controller({
  version: '1',
  path: 'groups',
})
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get(':name')
  async getGroupByName(@Param('name') name: string): Promise<GroupDto> {
    return await this.groupsService.getGroupByName(name.toUpperCase());
  }
}
