import { FacultyDto } from './faculty.dto';
import { Length } from 'class-validator';

export class GroupDto {
  @Length(1, 100)
  name: string;
  id: number;
  faculty: FacultyDto;
}
