import { IsDate } from 'class-validator';

export class Week {
  @IsDate()
  beginDate: Date;

  @IsDate()
  endDate: Date;
}
