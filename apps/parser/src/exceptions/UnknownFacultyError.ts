import { CriticalError } from "./CriticalError";
export class UnknownFacultyError extends CriticalError {
  constructor() {
    super("Faculty is unknown.", null);
    this.name = this.constructor.name;
  }
}
