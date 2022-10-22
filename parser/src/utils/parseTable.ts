// import XLSX from "xlsx";

// export const parseTable = (path: string) => {
//   const workbook = XLSX.readFile(path);
//   //console.log(workbook.Sheets);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const range = XLSX.utils.decode_range(sheet["!ref"]);
//   for (let r = range.s.r; r <= range.e.r; r++) {
//     for (let c = range.s.c; c <= range.e.c; c++) {
//       //console.log("Row ", r);
//       //console.log("Column ", c);
//       const cell = XLSX.utils.encode_cell({ c: c, r: r });
//       if (!sheet[cell]) continue;
//       if (sheet[cell].v === "230Б") {
//         console.log(sheet[cell]);
//         console.log(cell);
//       }
//     }
//   }
// };

// export const getGroupRow = (group: string) => {
//   for (let r = range.s.r; r <= range.e.r; r++) {
//     for (let c = range.s.c; c <= range.e.c; c++) {
//       const cell = XLSX.utils.encode_cell({ c: c, r: r });
//       if (!sheet[cell]) continue;
//       if (sheet[cell].v === group) {
//         console.log(sheet[cell]);
//         console.log(cell);
//       }
//     }
//   }
// };
