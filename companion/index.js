import * as messaging from "messaging";
import { settingsStorage } from "settings";

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data) {
    let ifttt = settingsStorage.getItem("toggleIFTTT");
    let apiKey = settingsStorage.getItem("apiKey");
    let aio = settingsStorage.getItem("toggleAIO");
    let aioKey = settingsStorage.getItem("aioKey");
    let aioUser = settingsStorage.getItem("aioUser");
    let aioFeed = settingsStorage.getItem("aioFeed");

    let eventName = evt.data.eventName;
    let result = evt.data.result;
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    if (((ifttt == "true" && apiKey) || (aio == "true" && aioKey && aioUser && aioFeed)) && eventName) {
      
      if (ifttt == "true") {
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
      }
      
      if (aio == "true") {
        aioKey = JSON.parse(aioKey).name;
        aioUser = JSON.parse(aioUser).name;
        aioFeed = JSON.parse(aioFeed).name;
        let url = `https://io.adafruit.com/api/v2/${aioUser}/feeds/${aioFeed}/data`;
        let d = JSON.stringify({'value' : result});
        myHeaders.append('X-AIO-Key', aioKey);
        console.log("Data: "+d);
        fetch(url, {
          method: "POST",
          mode: "no-cors",
          headers: myHeaders,
          body: d
        });
      }
      
    } else {
      console.log("You must configure the API key in Settings.");
    }
  }
});