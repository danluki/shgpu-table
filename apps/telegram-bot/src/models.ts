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
  faculty: Faculty;
}

export class Subscriber {
  chatId: number;
  groupName: string;
  facultyId: number;
}
