import { Entity, Primary, OneToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Faculty } from "./faculty";

@Entity({
  name: "groups",
})
export class Group {
  @PrimaryColumn()
  name: string;

  @ManyToOne(() => Faculty, (faculty: Faculty) => faculty.id)
  faculty: Faculty
}
