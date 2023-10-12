export const ShopifyService = {
  createCheckout: async (
    sellingPlanId: string | number,
    quantity: string | number,
    variantId: string | number
  ) => {
    const url = `https://shopify-quiz-checkout-app-production.up.railway.app/api/create-checkout?quantity=${quantity}&variantId=${variantId}${
      sellingPlanId ? "&sellingPlanId=" + sellingPlanId : ""
    }`;

    const res = await fetch(url, {
      method: "get",
      headers: {
        "Content-Typ": "application/json",
      },
    });

    const data = await res.json();

    return data.data;
  },
};
