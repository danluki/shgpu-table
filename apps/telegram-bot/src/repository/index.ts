import { DBError, UniqueViolationError, wrapError } from "db-errors";
import { ChatIsAlreadySubscribedError } from "../exceptions/ChatIsAlreadySubcribed";
import { pool } from "./pool";

class Repository {
  public async getSubscriberByChatId(chatId: number): Promise<any> {
    try {
      const res = await pool.query(
        "SELECT * FROM subscribed_chats WHERE chat_id = $1",
        [chatId]
      );
      if (res.rowCount > 0) {
        return res.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new DBError();
    }
  }

  public async addNewSubscriber(
    chatId: number,
    groupName: string,
    facultyId: number
  ): Promise<any> {
    try {
      return await pool.query(
        "INSERT INTO subscribed_chats (chat_id, group_name, faculty_id) VALUES ($1, $2, $3)",
        [chatId, groupName, facultyId]
      );
    } catch (e) {
      e = wrapError(e);

      if (e instanceof UniqueViolationError) {
        throw new ChatIsAlreadySubscribedError(e);
      }

      throw new DBError();
    }
  }

  public async removeSubscriber(chatId: number): Promise<number> {
    try {
      const res = await pool.query(
        "DELETE FROM subscribed_chats WHERE chat_id = $1",
        [chatId]
      );
      if (res.rowCount === 1) {
        return res.rowCount;
      }
    } catch (e) {
      throw new DBError();
    }
  }
}

export default new Repository();
