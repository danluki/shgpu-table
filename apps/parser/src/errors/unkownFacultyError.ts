export class UnknownFacultyError extends Error {
  constructor(facultyId: number) {
    super(`Unkown faculty ${facultyId} given`);
  }
}
