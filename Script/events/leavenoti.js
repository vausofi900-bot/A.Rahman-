module.exports.config = {
  name: "leave",
  eventType: ["log:unsubscribe"],
  version: "1.0.0",
  credits: "SaGor",
  description: "left notification",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
  const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } =  global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
  const { threadID } = event;
  const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
  const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
  const type = (event.author == event.logMessageData.leftParticipantFbId) ? "সমস্যা থাকলে আমার বস প্রিন্স রে বলে দাও" : "সমস্যা থাকলে আমার বস প্রিন্স রে বলে যাও";
  (typeof data.customLeave == "undefined") ? msg = "😈 কিরে𒁍{name}\ তোর কি সমস্যা আমার বস প্রিন্স রে বলে যা😈" : msg = data.customLeave;
  msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

  var link = [  
"https://i.postimg.cc/Y2s6YB6M/Black-Purple-Modern-Geometric-Animation-Youtube-Channel-Intro-20250810-113208-0001.gif",
  ];
  var callback = () => api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + "/cache/leiamnashO.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/leiamnashO.jpg"));
    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/leiamnashO.jpg")).on("close", () => callback());
                                                                  }
