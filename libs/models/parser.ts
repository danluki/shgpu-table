export type Pair = {
  day: number;
  number: number;
  name: string;
  date: string;
  groupName: string;
  faculty: {
    id: number;
    name: string;
  };
};

export type Week = {
  beginDate: Date;
  endDate: Date;
};

export type Faculty = {
  id: number;
  name: string;
  link: string;
};
