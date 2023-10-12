import { MANYCHAT_API_URL } from "@/constants/api-urls";
import { type Subscriber } from "@/types/subscriber";

export const ManyChatService = {
  getSubscriberInfo: async (subscriberId: string): Promise<Subscriber> => {
    const res = await fetch(
      `${MANYCHAT_API_URL}/subscriber/getInfo?subscriber_id=${subscriberId}`,
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
