import { Length } from 'class-validator';

export class InstructorDto {
  @Length(3, 50)
  name: string;
}
