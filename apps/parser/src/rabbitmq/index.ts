import { Connection, Channel, connect, Message } from "amqplib";

export default class RabbitmqServer {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, pattern: string, data: any) {
    return this.channel.sendToQueue(
      queue,
      Buffer.from(
        JSON.stringify({
          pattern,
          data,
        })
      )
    );
  }
}
