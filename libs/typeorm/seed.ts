import { Faculty } from "./src/entities/faculty";
import { AppDataSource, QueryFailedError } from "./src";
import { Group } from "./src/entities/group";
import { DatabaseError } from "pg";
import * as process from "process";

async function start() {
    const typeorm = await AppDataSource.initialize();

    const faculties: Faculty[] = [
        { id: 12, name: "Гуманитарный институт" },
        { id: 8, name: "Институт психологии и педагогики" },
        {
            id: 11,
            name: "Институт информационных технологий,точных и естественных наук",
        },
        { id: 3, name: "Факультет физической культуры" },
        { id: 15, name: "Университетский колледж" },
    ];

    try {
        const res = await typeorm.getRepository(Faculty).save(faculties);

        if (res.length === 5) {
            console.log("Faculties successfully created");
        } else {
            console.log("Can't create faculties");
            process.exit(0);
        }
    } catch (error) {
        if (error instanceof QueryFailedError) {
            const err = error.driverError as DatabaseError;
            if (err.code === "23505") {
                return;
            }
            throw err;
        }
    }

    try {
        await typeorm.getRepository(Group).manager.query(
            `INSERT INTO groups ("name", "facultyId") VALUES ('130Б', 11)`
        );
        await typeorm.getRepository(Group).manager.query(
            `DELETE FROM groups WHERE name = '130Б'`
        );
    }
    catch(error) {
        if (error instanceof QueryFailedError) {
            const err = error.driverError as DatabaseError;
            if (err.code === "23505") {
                process.exit(0);
            }
            throw err;
        }
    }

    try {
        //Maybe change to parsing from excel
        await typeorm.getRepository(Group).manager.query(
            `INSERT INTO groups ("name", "facultyId") VALUES ('130Б', 11),
('131Б', 11),
('132Б', 11),
('133Б-а', 11),
('133Б-б', 11),
('134Б-а', 11),
('134Б-б', 11),
('134Б-в', 11),
('135Б-а', 11),
('135Б-б', 11),
('130М', 11),
('131М', 11),
('230Б', 11),
('231Б', 11),
('232Б-а', 11),
('232Б-б', 11),
('233Б-а', 11),
('233Б-б', 11),
('234Б-а', 11),
('234Б-б', 11),
('235Б-а', 11),
('235Б-б', 11),
('236Б', 11),
('230М', 11),
('231М', 11),
('232М', 11),
('330Б', 11),
('331Б', 11),
('332Б-а', 11),
('332Б-б', 11),
('333Б-а', 11),
('333Б-б', 11),
('334Б-б', 11),
('334Б-в', 11),
('335Б', 11),
('337Б', 11),
('430Б', 11),
('431Б-а', 11),
('432Б-а', 11),
('432Б-б', 11),
('433Б', 11),
('434Б-б', 11),
('435Б', 11),
('532Б-а', 11),
('532Б-б', 11),
('534Б', 11),
('122Б', 12),
('124Б', 12),
('125Б', 12),
('127Б', 12),
('128Б', 12),
('222Б', 12),
('224Б', 12),
('225Б', 12),
('227Б', 12),
('228Б', 12),
('322Б', 12),
('324Б', 12),
('325Б', 12),
('326Б', 12),
('327Б', 12),
('421Б', 12),
('422Б', 12),
('424Б', 12),
('426Б', 12),
('427Б', 12),
('521Б', 12),
('522Б', 12),
('524Б', 12),
('525Б', 12),
('526Б', 12),
('527Б', 12),
('121М', 12),
('125М', 12),
('220М', 12),
('222М', 12),
('110Б', 8),
('111Б', 8),
('112Б', 8),
('113Б', 8),
('114Б', 8),
('115Б', 8),
('210Б', 8),
('211Б', 8),
('212Б', 8),
('213Б', 8),
('214Б', 8),
('311Б', 8),
('313Б', 8),
('411Б', 8),
('412Б', 8),
('413Б', 8),
('111М', 8),
('113М-а', 8),
('113М-б', 8),
('211М', 8),
('212М', 8),
('213М', 8),
('171Б', 3),
('172Б', 3),
('271Б', 3),
('272Б', 3),
('371Б', 3),
('372Б', 3),
('471Б', 3),
('472Б', 3),
('571Б', 3),
('572Б', 3),
('150С', 15),
('151С', 15),
('152С', 15),
('153С', 15);`
        );
    } catch (error) {
        if (error instanceof QueryFailedError) {
            const err = error.driverError as DatabaseError;
            if (err.code === "23505") {
                return;
            }
            throw err;
        }
    }
}

start();