/*
 * Entry point for the watch app
 */

import document from "document";
import * as messaging from "messaging";

console.log("App code started");

const btn_good = document.getElementById("btn-good");
const btn_neutral = document.getElementById("btn-neutral");
const btn_bad = document.getElementById("btn-bad");

const eventName = "mood_log";

btn_good.addEventListener("click", () => {
  sendEventIfReady(eventName, "good");
});
btn_neutral.addEventListener("click", () => {
  sendEventIfReady(eventName, "neutral");
});
btn_bad.addEventListener("click", () => {
  sendEventIfReady(eventName, "bad");
});

function sendEventIfReady(eventName, val) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({eventName: eventName, result: val});
  }
}