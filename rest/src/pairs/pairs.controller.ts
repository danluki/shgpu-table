import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ParseDateIsoPipe } from './pipes/parse-date-iso.pipe';

@Controller({
  version: '1',
  path: 'pairs',
})
export class PairsController {
  @Get()
  async getPairs(
    @Query('groupId') groupId?: number,
    @Query('groupName') groupName?: string,
    @Query('daysCount') daysCount?: number,
    @Query('day') day?: number,
    @Query('beginDate', ParseDateIsoPipe) beginDate?: string,
    @Query('endDate', ParseDateIsoPipe) endDate?: string,
  ) {
    if (groupId && groupName)
      throw new HttpException(
        'Please, specify only one of groupId and groupName',
        HttpStatus.BAD_REQUEST,
      );
    if (groupId) {
      
    } else if (groupName) {

    }
    return groupName;
  }
}
