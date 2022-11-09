import { Matches, Min, Max } from 'class-validator';

export class ScheduleDto {
  @Min(1)
  @Max(6)
  number: number;

  @Matches(/\d{1,2}:\d{1,2}/i)
  beginTime: string;

  @Matches(/\d{1,2}:\d{1,2}/i)
  endTime: string;
}
