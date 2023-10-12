"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!!!window) return;
    window.location.href = "https://balanutritions.com/pages/quiz";
  }, []);
}
