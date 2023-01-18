import { PrimaryColumn, Column, Entity, OneToMany } from "typeorm";

@Entity({
  name: "faculties",
})
export class Faculty {
  @PrimaryColumn("integer", { name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;
}
