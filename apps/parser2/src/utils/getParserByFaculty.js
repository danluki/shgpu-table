import { CollegeParser } from "../parsers/CollegeParser";
import { GymParser } from "../parsers/GymParser";
import { ItienParser } from "../parsers/ItienParser";
import { PeParser } from "../parsers/PeParser";
import { PsychoParser } from "../parsers/PsychoParser";
export const getParserByFaculty = (facultyId, path) => {
    switch (facultyId) {
        case 12:
            return new GymParser(path);
        case 8:
            return new PsychoParser(path);
        case 11:
            return new ItienParser(path);
        case 3:
            return new PeParser(path);
        case 15:
            return new CollegeParser(path);
        default:
            return null;
    }
};
//# sourceMappingURL=getParserByFaculty.js.map