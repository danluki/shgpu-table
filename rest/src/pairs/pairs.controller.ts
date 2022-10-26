import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PairsService } from './pairs.service';

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
    @Query('daysOffset') daysOffset?: number,
    @Query('beginDate') beginDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (daysCount && daysOffset && beginDate && endDate) {
      throw new HttpException(
        'Please, specify you request using docs',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (groupId && groupName)
      throw new HttpException(
        'Please, specify only one of groupId and groupName',
        HttpStatus.BAD_REQUEST,
      );
    if ((beginDate && !endDate) || (!beginDate && endDate)) {
      throw new HttpException(
        'Please, specify only both two beginDate and endDate',
        HttpStatus.BAD_REQUEST,
      );
    }
    if ((daysCount && !daysOffset) || (!daysCount && daysOffset)) {
      throw new HttpException(
        'Please, specify both daysCount and day.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (beginDate && endDate) {
      if (groupId) {
        return await this.pairsService.getPairsByIdAndDate(
          groupId,
          new Date(beginDate),
          new Date(endDate),
        );
      } else if (groupName) {
        return await this.pairsService.getPairsByIdAndDate(
          groupId,
          new Date(beginDate),
          new Date(endDate),
        );
      }
    }
    if (daysCount && daysOffset) {
      if (groupId) {
        return await this.pairsService.getPairsByIdAndDayOffsetAndCount(
          groupId,
          daysOffset,
          daysCount,
        );
      }
      if (groupName) {
        return await this.pairsService.getPairsByNameAndDayOffsetAndCount(
          groupName,
          daysOffset,
          daysCount,
        );
      }
    }

    throw new HttpException('BAD REQUEST.', HttpStatus.BAD_REQUEST);
  }
}
