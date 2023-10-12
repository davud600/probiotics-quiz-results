import { type Subscriber } from "@/types/subscriber";

export const SubscriberService = {
  getInfo: async (subscriberId: string): Promise<Subscriber> => {
    const res = await fetch(
      `${process.env.MANYCHAT_API_URL}/subscriber/getInfo?subscriber_id=${subscriberId}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MANYCHAT_TOKEN}`,
        },
      }
    );
    const data = await res.json();

    return data.data;
  },
};
