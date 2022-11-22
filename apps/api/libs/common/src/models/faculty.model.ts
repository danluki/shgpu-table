import { Length } from 'class-validator';

export class Faculty {
  @Length(1, 100)
  name: string;
  id: number;
}
