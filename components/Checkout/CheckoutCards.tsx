"use client";

import { PRODUCT_PRICES } from "@/constants/prices";
import { ShopifyService } from "@/services/shopify";
import { useEffect } from "react";

// Function to initiate checkout for a specific product and quantity
async function startCheckout(
  quantity: number | string,
  variantId: number | string = 45489774362907,
  sellingPlanId: number | string = ""
) {
  const windowReference = window.open();

  const url = await ShopifyService.createCheckout(
    quantity,
    variantId,
    sellingPlanId
  );

  if (!!!windowReference) return;

  windowReference.location = url;
}

export default function CheckoutCards() {
  useEffect(() => {
    if (!!!document) return;

    const radios = document.querySelectorAll("input[type=radio]");

    radios.forEach((radio: any) =>
      radio.addEventListener("change", () => {
        // find price element
        let priceElement: any = document.querySelector(`#${radio.name}-price`);
        if (window.screen.width <= 768) {
          priceElement = document.querySelector(`#${radio.name}-price-mobile`);
        }

        // find old price element
        let oldPriceElement: any = document.querySelector(
          `#${radio.name}-old-price`
        );
        if (window.screen.width <= 768) {
          oldPriceElement = document.querySelector(
            `#${radio.name}-old-price-mobile`
          );
        }

        // find per day price
        let perDayPriceElement: any = document.querySelector(
          `#${radio.name}-per-day-price`
        );
        if (window.screen.width <= 768) {
          perDayPriceElement = document.querySelector(
            `#${radio.name}-per-day-price-mobile`
          );
        }

        // find product price
        const productPrices =
          PRODUCT_PRICES[
            radio.name as unknown as "product-1" | "product-2" | "product-3"
          ];

        if (!!!priceElement || !!!oldPriceElement || !!!perDayPriceElement)
          return;

        // check if its subscribe or one time radio
        if (radio.classList.contains("subscription-input")) {
          priceElement.innerText = `$${productPrices.subscription}`;
          oldPriceElement.innerText = `$${productPrices.oldSubscription}`;
          perDayPriceElement.innerText = `$${productPrices.perDaySubscription}`;
        } else if (radio.classList.contains("one-time-input")) {
          priceElement.innerText = `$${productPrices.oneTime}`;
          oldPriceElement.innerText = `$${productPrices.oldOneTime}`;
          perDayPriceElement.innerText = `$${productPrices.perDayOneTime}`;
        }
      })
    );

    // Submitting forms
    document.querySelectorAll(".product-1-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const radios = document.querySelectorAll(
          `.radio-input-1-${window.screen.width > 768 ? "desktop" : "mobile"}`
        );

        let oneTime = true;

        radios.forEach((radio: any) => {
          if (radio.checked) {
            if (radio.value === "subscription") oneTime = false;
          }
        });

        if (!oneTime) {
          startCheckout(1, 45489774362907, 689544823067);
        } else {
          startCheckout(1);
        }
      });
    });
    document.querySelectorAll(".product-2-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const radios = document.querySelectorAll(
          `.radio-input-2-${window.screen.width > 768 ? "desktop" : "mobile"}`
        );

        let oneTime = true;

        radios.forEach((radio: any) => {
          if (radio.checked) {
            if (radio.value === "subscription") oneTime = false;
          }
        });

        if (!oneTime) {
          startCheckout(1, 46964244021531, 689548624155);
        } else {
          startCheckout(1, 46964244021531);
        }
      });
    });
    document.querySelectorAll(".product-3-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const radios = document.querySelectorAll(
          `.radio-input-3-${window.screen.width > 768 ? "desktop" : "mobile"}`
        );

        let oneTime = true;

        radios.forEach((radio: any) => {
          if (radio.checked) {
            if (radio.value === "subscription") oneTime = false;
          }
        });

        if (!oneTime) {
          startCheckout(1, 46964311851291, 689548656923);
        } else {
          startCheckout(1, 46964311851291);
        }
      });
    });
  }, []);

  return (
    <>
      <div className="md:flex justify-center items-center gap-6 hidden">
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-1-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <h1 className="text-center font-semibold text-lg">
              1-month supply
            </h1>

            <img
              className="w-64 h-auto"
              src="https://i.imgur.com/OqPlalp.png"
              alt="product"
            />

            <div className="flex flex-col w-full">
              <div className="flex items-end gap-1">
                <span
                  id="product-1-price"
                  className="text-3xl"
                  style={{
                    color: "rgb(33, 37, 41)",
                  }}
                >
                  $39.90
                </span>
                <span
                  className="text-sm mb-1"
                  style={{ color: "rgb(108, 117, 125)" }}
                >
                  per bottle
                </span>
              </div>
              <span
                id="product-1-old-price"
                className="line-through text-red-300 text-xl"
              >
                $69.90
              </span>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-1-subscription-desktop"
                  name="product-1"
                  value="subscription"
                  className="radio-input-1-desktop subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                  htmlFor="product-1-subscription-desktop"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-1-one-time-desktop"
                  name="product-1"
                  value="one-time"
                  className="radio-input-1-desktop one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                  htmlFor="product-1-one-time-desktop"
                >
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <div
              className="flex flex-col gap-2 w-full text-sm"
              style={{
                color: "rgb(33, 37, 41)",
                fontWeight: 300,
              }}
            >
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>30 SERVINGS</span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>
                  <span id="product-1-per-day-price">$1.33</span> PER DAY
                </span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>1 BOTTLE DELIVERED</span>
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-2-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <h1 className="text-center font-semibold text-lg">
              3-month supply
            </h1>

            <img
              className="w-64 h-auto"
              src="https://i.imgur.com/aHgouBK.png"
              alt="product"
            />

            <div className="flex flex-col w-full">
              <div className="flex items-end gap-1">
                <span
                  id="product-2-price"
                  className="text-3xl"
                  style={{
                    color: "rgb(33, 37, 41)",
                  }}
                >
                  $36.00
                </span>
                <span
                  className="text-sm mb-1"
                  style={{ color: "rgb(108, 117, 125)" }}
                >
                  per bottle
                </span>
              </div>
              <span
                id="product-2-old-price"
                className="line-through text-red-300 text-xl"
              >
                $71.99
              </span>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-2-subscription-desktop"
                  name="product-2"
                  value="subscription"
                  className="radio-input-2-desktop subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                  htmlFor="product-2-subscription-desktop"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-2-one-time-desktop"
                  name="product-2"
                  value="one-time"
                  className="radio-input-2-desktop one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    fontWeight: 300,
                    color: "rgb(33, 37, 41)",
                  }}
                  htmlFor="product-2-one-time-desktop"
                >
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <div
              className="flex flex-col gap-2 w-full text-sm"
              style={{
                color: "rgb(33, 37, 41)",
                fontWeight: 300,
              }}
            >
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>60 SERVINGS</span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>
                  <span id="product-2-per-day-price">$0.6</span> PER DAY
                </span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>3 BOTTLES DELIVERED</span>
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-3-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <h1 className="text-center font-semibold text-lg">
              6-month supply
            </h1>

            <img
              className="w-64 h-auto"
              src="https://i.imgur.com/4YqgWqg.png"
              alt="product"
            />

            <div className="flex flex-col w-full">
              <div className="flex items-end gap-1">
                <span
                  id="product-3-price"
                  className="text-3xl"
                  style={{
                    color: "rgb(33, 37, 41)",
                  }}
                >
                  $26.94
                </span>
                <span
                  className="text-sm mb-1"
                  style={{
                    color: "rgb(108, 117, 125)",
                  }}
                >
                  per bottle
                </span>
              </div>
              <span
                id="product-3-old-price"
                className="line-through text-red-300 text-xl"
              >
                $48.99
              </span>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-3-subscription-desktop"
                  name="product-3"
                  value="subscription"
                  className="radio-input-3-desktop subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                  htmlFor="product-3-subscription-desktop"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="product-3-one-time-desktop"
                  name="product-3"
                  value="one-time"
                  className="radio-input-3-desktop one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                  htmlFor="product-3-one-time-desktop"
                >
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <div
              className="flex flex-col gap-2 w-full text-sm"
              style={{
                color: "rgb(33, 37, 41)",
                fontWeight: 300,
              }}
            >
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>90 SERVINGS</span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>
                  <span id="product-3-per-day-price">$0.32</span> PER DAY
                </span>
              </div>
              <div className="flex gap-1 items-center w-full">
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                  <path
                    d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                    fill="#212529"
                  ></path>
                </svg>
                <span>6 BOTTLE DELIVERED</span>
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-6 md:hidden">
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-1-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <div className="flex w-full justify-between items-start">
              <img
                className="w-[45%] h-auto"
                src="https://i.imgur.com/OqPlalp.png"
                alt="product"
              />

              <div className="flex flex-col gap-2">
                <h1 className="text-start font-semibold">1-month supply</h1>
                <div className="flex gap-1 items-start">
                  <div className="flex flex-col items-start">
                    <span
                      id="product-1-price-mobile"
                      className="text-2xl"
                      style={{
                        color: "rgb(33, 37, 41)",
                      }}
                    >
                      $47.99
                    </span>
                    <span
                      className="text-xs mb-1"
                      style={{
                        color: "rgb(108, 117, 125)",
                      }}
                    >
                      per bottle
                    </span>
                  </div>
                  <span
                    id="product-1-old-price-mobile"
                    className="line-through text-red-300 text-2xl"
                  >
                    $79.99
                  </span>
                </div>

                <div
                  className="flex flex-col gap-2 w-full text-xs"
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                >
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>30 SERVINGS</span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>
                      <span id="product-1-per-day-price-mobile">$1.6</span> PER
                      DAY
                    </span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>1 BOTTLE DELIVERED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-1-subscription-mobile"
                  name="product-1"
                  value="subscription"
                  className="radio-input-1-mobile subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  className="text-sm"
                  htmlFor="product-1-subscription-mobile"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-1-one-time-mobile"
                  name="product-1"
                  value="one-time"
                  className="radio-input-1-mobile one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label className="text-sm" htmlFor="product-1-one-time-mobile">
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-2-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <div className="flex w-full justify-between items-start">
              <img
                className="w-[45%] h-auto"
                src="https://i.imgur.com/aHgouBK.png"
                alt="product"
              />

              <div className="flex flex-col gap-2">
                <h1 className="text-start font-semibold">3-month supply</h1>
                <div className="flex gap-1 items-start">
                  <div className="flex flex-col items-start">
                    <span
                      id="product-2-price-mobile"
                      className="text-2xl"
                      style={{
                        color: "rgb(33, 37, 41)",
                      }}
                    >
                      $36.00
                    </span>
                    <span
                      className="text-xs mb-1"
                      style={{
                        color: "rgb(108, 117, 125)",
                      }}
                    >
                      per bottle
                    </span>
                  </div>
                  <span
                    id="product-2-old-price-mobile"
                    className="line-through text-red-300 text-2xl"
                  >
                    $71.99
                  </span>
                </div>

                <div
                  className="flex flex-col gap-2 w-full text-xs"
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                >
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>90 SERVINGS</span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>
                      <span id="product-2-per-day-price-mobile">$0.6</span> PER
                      DAY
                    </span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>3 BOTTLES DELIVERED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-2-subscription-mobile"
                  name="product-2"
                  value="subscription"
                  className="radio-input-2-mobile subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  className="text-sm"
                  htmlFor="product-2-subscription-mobile"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-2-one-time-mobile"
                  name="product-2"
                  value="one-time"
                  className="radio-input-2-mobile one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label className="text-sm" htmlFor="product-2-one-time-mobile">
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
        <div className="p-8 bg-white w-fit h-fit">
          <form
            className="product-3-form flex flex-col gap-5 items-center"
            target="_blank"
          >
            <div className="flex w-full justify-between items-start">
              <img
                className="w-[45%] h-auto"
                src="https://i.imgur.com/4YqgWqg.png"
                alt="product"
              />

              <div className="flex flex-col gap-2">
                <h1 className="text-start font-semibold">6-month supply</h1>
                <div className="flex gap-1 items-start">
                  <div className="flex flex-col items-start">
                    <span
                      id="product-3-price-mobile"
                      className="text-2xl"
                      style={{
                        color: "rgb(33, 37, 41)",
                      }}
                    >
                      $29.39
                    </span>
                    <span
                      className="text-xs mb-1"
                      style={{
                        color: "rgb(108, 117, 125)",
                      }}
                    >
                      per bottle
                    </span>
                  </div>
                  <span
                    id="product-3-old-price-mobile"
                    className="line-through text-red-300 text-2xl"
                  >
                    $48.99
                  </span>
                </div>

                <div
                  className="flex flex-col gap-2 w-full text-xs"
                  style={{
                    color: "rgb(33, 37, 41)",
                    fontWeight: 300,
                  }}
                >
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>180 SERVINGS</span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>
                      <span id="product-3-per-day-price-mobile">$0.32</span> PER
                      DAY
                    </span>
                  </div>
                  <div className="flex gap-1 items-center w-full">
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                      <path
                        d="M16.5 1.6L15.7 0C8.8 2 5.3 6.4 5.3 6.4L2.1 4L0.5 5.6L5.3 12C9 5.1 16.5 1.6 16.5 1.6Z"
                        fill="#212529"
                      ></path>
                    </svg>
                    <span>6 BOTTLES DELIVERED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-3-subscription-mobile"
                  name="product-3"
                  value="subscription"
                  className="radio-input-3-mobile subscription-input w-4 h-4 text-black bg-black border-black"
                />
                <label
                  className="text-sm"
                  htmlFor="product-3-subscription-mobile"
                >
                  Subscribe &amp; Save
                </label>
                <br />
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="product-3-one-time-mobile"
                  name="product-3"
                  value="one-time"
                  className="radio-input-3-mobile one-time-input w-4 h-4 text-black bg-black border-black"
                />
                <label className="text-sm" htmlFor="product-3-one-time-mobile">
                  One-time purchase
                </label>
                <br />
              </div>
            </div>

            <button className="py-4 px-6 bg-black text-white w-full rounded-full font-bold">
              Order now
            </button>

            <span
              className="text-xs"
              style={{
                color: "rgb(108, 117, 125)",
                fontWeight: 300,
              }}
            >
              Cancel anytime. Free shipping.
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
