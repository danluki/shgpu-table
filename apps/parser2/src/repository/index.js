import pool from "../db/connection";
class Repository {
    async getGroupId(groupName) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT id FROM groups WHERE name = $1;", [groupName], (err, result) => {
                if (err) {
                    return reject(err);
                }
                if (result.rowCount > 0) {
                    return resolve(result.rows[0].id);
                }
                else {
                    return resolve(null);
                }
            });
        });
    }
    addPair(pair, groupId, facultyId) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO pairs (name, number, day, date, group_id, faculty_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;", [pair.name, pair.number, pair.day, pair.date, groupId, facultyId], (err, result) => {
                if (err) {
                    if (err.code === "23505") {
                        return resolve("");
                    }
                    return resolve(err);
                }
                return resolve(result.rows[0].id);
            });
        });
    }
    async deletePairs(facultyId) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM pairs WHERE faculty_id = $1", [facultyId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result.rowCount);
            });
        });
    }
}
export default new Repository();
//# sourceMappingURL=index.js.map