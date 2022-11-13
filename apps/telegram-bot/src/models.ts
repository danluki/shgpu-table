export type Pair = {
  day: number;
  number: number;
  name: string;
  date: Date;
};

export class Faculty {
  name: string;
  id: number;
}

export class Group {
  name: string;
  id: number;
  faculty_id: number;
}

export class Subscriber {
  chat_id: number;
  group_name: string;
  faculty_id: number;
}

export class Schedule {
  number: number;
  begint: string;
  endt: string;
}
