import { DBError, UniqueViolationError, wrapError } from "db-errors";
import { ChatIsAlreadySubscribedError } from "../exceptions/ChatIsAlreadySubcribed";
import { pool } from "./pool";
class Repository {
    async getSubscribers() {
        const res = await pool.query("SELECT * FROM telegram_subscribed_chats");
        return res.rows;
    }
    async getFacultySubscribers(facultyId) {
        const res = await pool.query("SELECT * FROM telegram_subscribed_chats WHERE faculty_id = $1", [facultyId]);
        return res.rows;
    }
    async getSubscriberByChatId(chatId) {
        try {
            const res = await pool.query("SELECT * FROM telegram_subscribed_chats WHERE chat_id = $1", [chatId]);
            if (res.rowCount) {
                return res.rows[0];
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw new DBError();
        }
    }
    async addNewSubscriber(chatId, groupName, facultyId) {
        try {
            return await pool.query("INSERT INTO telegram_subscribed_chats (chat_id, group_name, faculty_id) VALUES ($1, $2, $3)", [chatId, groupName, facultyId]);
        }
        catch (e) {
            e = wrapError(e);
            if (e instanceof UniqueViolationError) {
                throw new ChatIsAlreadySubscribedError(e);
            }
            throw new DBError();
        }
    }
    async removeSubscriber(chatId) {
        try {
            const res = await pool.query("DELETE FROM telegram_subscribed_chats WHERE chat_id = $1", [chatId]);
            if (res.rowCount) {
                return res.rowCount;
            }
        }
        catch (e) {
            throw new DBError();
        }
    }
}
export default new Repository();
//# sourceMappingURL=index.js.map