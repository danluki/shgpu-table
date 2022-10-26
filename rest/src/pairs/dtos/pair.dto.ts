import { Matches, Length, Min, Max } from 'class-validator';

export class PairDto {
  @Length(1, 50)
  instructor: string;

  @Length(1, 100)
  name: string;

  @Matches(/\d{4}-\d{1,2}-\d{1,2}/i)
  date: string;

  @Min(0)
  day: number;

  @Min(1)
  @Max(6)
  number: number;

  group_id: number;
  id: number;
  faculty_id: number;
}
