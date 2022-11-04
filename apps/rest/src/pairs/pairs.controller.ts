import { QueryDto } from './dtos/query.dto';
import { PairDto } from './dtos/pair.dto';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PairsService } from './pairs.service';
import {
  Client,
  ClientProxy,
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@ApiTags('pairs')
@Controller({
  version: '1',
  path: 'pairs',
})
export class PairsController {
  constructor(private pairsService: PairsService) {}
  @Get()
  @ApiOperation({
    description: 'Get pairs based on query parameters',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Possible if wrong query format.',
  })
  @ApiOkResponse({
    description: 'Returned when, request was successfully retrieved',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Happens, when server received some unexpected situation.',
  })
  @HttpCode(HttpStatus.OK)
  async getPairs(@Query() query: QueryDto): Promise<PairDto[]> {
    const { groupName, groupId, daysCount, daysOffset, beginDate, endDate } =
      query;
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
          beginDate,
          endDate,
        );
      } else if (groupName) {
        return await this.pairsService.getPairsByNameAndDate(
          groupName,
          beginDate,
          endDate,
        );
      }
    }
    if (daysCount && daysOffset) {
      if (groupId) {
        return await this.pairsService.getPairsByIdAndDayOffsetAndCount(
          groupId,
          daysOffset,
          daysCount - 1,
        );
      }
      if (groupName) {
        return await this.pairsService.getPairsByNameAndDayOffsetAndCount(
          groupName,
          daysOffset,
          daysCount - 1,
        );
      }
    }

    throw new HttpException(
      'Some unexpected situation on server.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async getPairsForInstructor() {}

  @EventPattern('new_table')
  handleNewTable(data: Record<string, unknown>) {
    console.log(data);
  }

  // @MessagePattern('table_was_updated')
  // handleTableUpdate(@Payload() data: any, @Ctx() context: RmqContext) {
  //   console.log('Table was updated.');
  // }
}
