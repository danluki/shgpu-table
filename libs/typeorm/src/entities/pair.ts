import {
    Column,
    PrimaryColumn,
    Entity,
    Check,
    ManyToOne,
    Unique,
} from "typeorm";
import { Faculty } from "./faculty";

@Entity("pairs", { schema: "public" })
@Check('"number" >= 1 AND "number" <= 6')
@Check('"day" >= 1 AND "day" <= 6')
// @Unique(["name", "number", "day", "groupName"])
export class Pair {
    @PrimaryColumn("text", {
        primary: true,
        name: "id",
        default: () => "gen_random_uuid()",
    })
    id: string;

    @Column("text", { name: "name", nullable: false })
    name: string;

    @Column("integer", {
        name: "number",
        nullable: false,
    })
    number: number;

    @Column("integer", {
        name: "day",
        nullable: false,
    })
    day: number;

    @Column("text", {
        name: "group_name",
        nullable: false,
    })
    groupName: string;

    @Column({
        type: "date",
        nullable: false,
    })
    date: Date;

    @ManyToOne(() => Faculty, (faculty: Faculty) => faculty.id)
    faculty: Faculty;
}