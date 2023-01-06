import { faculties } from "../constraints/faculties";
import { UnknownFacultyError } from "../exceptions/UnknownFacultyError";
export const getFacultyFromLink = (link) => {
    const facultyId = Number(link?.match(new RegExp(/\d+/i))?.shift());
    const faculty = faculties.find((faculty) => faculty.id === facultyId);
    if (!faculty)
        throw new UnknownFacultyError(facultyId);
    return faculty;
};
//# sourceMappingURL=getFacultyFromLink.js.map