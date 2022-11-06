import { DBError, UniqueViolationError, wrapError } from "db-errors";
import { ChatIsAlreadySubscribedError } from "../exceptions/ChatIsAlreadySubcribed";
import { pool } from "./pool";

class Repository {
  public async getSubscriberByChatId(chatId: number): Promise<string> {
    try {
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
}

export default new Repository();
