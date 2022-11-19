import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';
import { toDate, toNumber } from '../helpers/pairs.helper';

export class QueryDto {
  @ApiProperty({
    description: 'Id of group for search. Cannot be used with groupName.',
    required: false,
    minimum: 0,
    type: 'number',
  })
  @Transform(({ value }) => toNumber(value, { min: 1 }))
  @IsNumber()
  @IsOptional()
  public groupId: number;

  @ApiProperty({
    description: 'Name of group for search. Cannot be used with groupId.',
    required: false,
    type: 'string',
  })
  @IsOptional()
  public groupName: string;

  @ApiProperty({
    description:
      'Count of days from currentDate + daysOffset. Cannot be used with beginDate and endDate',
    required: false,
    type: 'number',
    minimum: 1,
  })
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  public daysCount: number;

  @ApiProperty({
    description:
      'Count of days from currentDate + daysOffset. Cannot be used with beginDate and endDate',
    required: false,
    type: 'number',
    minimum: 0,
  })
  @Transform(({ value }) => toNumber(value))
  @IsNumber()
  @IsOptional()
  @Min(0)
  public daysOffset: number;

  @ApiProperty({
    description:
      'JavaScript date string, described from what date you want to get pairs. Including this date.',
    required: false,
    type: 'date',
  })
  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  public beginDate: Date;

  @ApiProperty({
    description:
      'JavaScript date string, described to what date you want to get pairs. Including this date.',
    required: false,
    type: 'date',
  })
  @Transform(({ value }) => toDate(value))
  @IsDate()
  @IsOptional()
  public endDate: Date;
}
