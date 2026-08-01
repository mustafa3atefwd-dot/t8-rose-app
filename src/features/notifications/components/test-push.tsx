"use client";

import { getVapidPublicKey } from "../apis/notifications.api";

export default function TestPush() {

  async function test() {
    const data = await getVapidPublicKey();

    console.log(data);
  }


  return (
    <button onClick={test}>
      Get VAPID Key
    </button>
  );
}