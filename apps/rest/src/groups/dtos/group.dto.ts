import { FacultyDto } from './faculty.dto';

export class GroupDto {
  name: string;
  id: number;
  faculty: FacultyDto;
}
