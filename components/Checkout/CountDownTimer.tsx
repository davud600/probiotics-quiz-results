"use client";

import { useEffect } from "react";

export default function CountDownTimer() {
  useEffect(() => {
    if (!!!document) return;

    // Countdown Timer
    (function () {
      const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      let today: any = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "09/30/",
        birthday = dayMonth + yyyy;

      today = mm + "/" + dd + "/" + yyyy;
      if (today > birthday) {
        birthday = dayMonth + nextYear;
      }

      const countDown: any = new Date(new Date().getTime() + 600000),
        x = setInterval(function () {
          const now = new Date().getTime(),
            distance = countDown - now;

          document.getElementById("hours")!.innerText = Math.floor(
            (distance % day) / hour
          ).toString();
          document.getElementById("minutes")!.innerText = Math.floor(
            (distance % hour) / minute
          ).toString();
          document.getElementById("seconds")!.innerText = Math.floor(
            (distance % minute) / second
          ).toString();
        }, 0);
    })();
  }, []);

  return (
    <div id="countdown">
      <ul className="flex gap-4">
        <li className="flex flex-col items-center justify-center">
          <span className="text-3xl" id="hours">
            7
          </span>
          Hours
        </li>
        <span className="text-3xl">:</span>
        <li className="flex flex-col items-center justify-center">
          <span className="text-3xl" id="minutes">
            18
          </span>
          Minutes
        </li>
        <span className="text-3xl">:</span>
        <li className="flex flex-col items-center justify-center">
          <span className="text-3xl" id="seconds">
            59
          </span>
          Seconds
        </li>
      </ul>
    </div>
  );
}
