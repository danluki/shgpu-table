export class ScheduleError extends Error {
  constructor() {
    super("Не удалось получить расписание звонков.");
  }
}
