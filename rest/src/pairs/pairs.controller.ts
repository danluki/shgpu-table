import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PairsService } from './pairs.service';
import { ParseDateIsoPipe } from './pipes/parse-date-iso.pipe';

@ApiTags('Pairs')
@Controller({
  version: '1',
  path: 'pairs',
})
export class PairsController {
  constructor(private pairsService: PairsService) {}

  @Get()
  async getPairs(
    @Query('groupId') groupId?: number,
    @Query('groupName') groupName?: string,
    @Query('daysCount') daysCount?: number,
    @Query('day') day?: number,
    @Query('beginDate') beginDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (groupId && groupName)
      throw new HttpException(
        'Please, specify only one of groupId and groupName',
        HttpStatus.BAD_REQUEST,
      );
    if (groupId) {
      return this.pairsService.getPairs(
        groupId,
        new Date('2022-10-24'),
        new Date('2022-10-25'),
      );
    } else if (groupName) {
    }
    return groupName;
  }
}
