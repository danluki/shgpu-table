export const faculties = [
    { id: 12, name: "Гуманитарный институт" },
    { id: 8, name: "Институт психологии и педагогики" },
    {
        id: 11,
        name: "Институт информационных технологий,точных и естественных наук",
    },
    { id: 3, name: "Факультет физической культуры" },
    { id: 15, name: "Университетский колледж" },
];
export var FacultiesIds;
(function (FacultiesIds) {
    FacultiesIds[FacultiesIds["GYM"] = 12] = "GYM";
    FacultiesIds[FacultiesIds["PSYCHO"] = 8] = "PSYCHO";
    FacultiesIds[FacultiesIds["ITIEN"] = 11] = "ITIEN";
    FacultiesIds[FacultiesIds["PE"] = 3] = "PE";
    FacultiesIds[FacultiesIds["COLLEGE"] = 15] = "COLLEGE";
})(FacultiesIds || (FacultiesIds = {}));
//# sourceMappingURL=faculties.js.map