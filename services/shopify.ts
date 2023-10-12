import { SHOPIFY_API_URL } from "@/constants/api-urls";

export const ShopifyService = {
  createCheckout: async (
    quantity: string | number,
    variantId: string | number,
    sellingPlanId: string = ""
  ): Promise<string> => {
    const url = `${SHOPIFY_API_URL}/create-checkout?quantity=${quantity}&variantId=${variantId}${
      sellingPlanId ? "&sellingPlanId=" + sellingPlanId : ""
    }`;

    const res = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data.data;
  },
};
