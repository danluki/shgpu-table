import { Length } from 'class-validator';

export class FacultyDto {
  @Length(1, 100)
  name: string;
  id: number;
}
