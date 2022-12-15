import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";
import { Pair } from "./pair";

@Entity({
  name: "faculties",
})
export class Faculty {
  @PrimaryColumn("integer", { name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: number;
}
