import Redis from "redis";

export interface PubSub {
  publish: (topic: string, data: Record<any, any> | any[] | string) => void;
  subscribe: (
    topic: string,
    cb: (data: Record<any, any> | any[] | string) => void
  ) => void;
}

export const createPubsub = async (url: string): Promise<PubSub> => {
  const subscriber = Redis.createClient({
    url,
  });

  const publisher = Redis.createClient({
    url,
  });
  await subscriber.connect();
  await publisher.connect();

  return {
    publish: (topic: string, data: Record<any, any> | any[] | string) => {
      publisher.publish(topic, JSON.stringify(data));
    },
    subscribe: (
      topic: string,
      cb: (data: Record<any, any> | any[] | string) => void
    ) => {
      subscriber.subscribe(topic, (msg) => cb(msg));
    },
  };
};
