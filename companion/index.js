import * as messaging from "messaging";
import { settingsStorage } from "settings";

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    let apiKey = settingsStorage.getItem("apiKey");
    let eventName = evt.data.eventName;
    let result = evt.data.result;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if (apiKey && eventName) {
      apiKey = JSON.parse(apiKey).name;
      let url = `https://maker.ifttt.com/trigger/${eventName}/with/key/${apiKey}`;
      let d = JSON.stringify({'value1' : result});
      console.log("Data: "+d);
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: myHeaders,
        body: d
      });
    } else {
      console.log("You must configure the API key in Settings.")
    }
  }
});