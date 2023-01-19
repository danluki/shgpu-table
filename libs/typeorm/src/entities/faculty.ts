import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity({
    name: "faculties",
})
export class Faculty {
    @PrimaryColumn("integer", { name: "id" })
    id: number;

    @Column("text", { name: "name" })
    name: string;
}