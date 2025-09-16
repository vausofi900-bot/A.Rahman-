module.exports.config = {
    name: "restart",
    version: "2.0.2",
    hasPermssion: 2,
    credits: "SaGor",
    description: "sagor restart cmd bot",
    commandCategory: "sagor",
    usages: "restart",
    cooldowns: 5,
    dependencies: { }
}
 
module.exports.run = async function({ api, args, Users, event}) {
const { threadID, messageID } = event;
const axios = global.nodemodule["axios"];

const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH");
    var phut = moment.tz("Asia/Ho_Chi_Minh").format("mm");
    var giay = moment.tz("Asia/Ho_Chi_Minh").format("ss");
const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
  if (event.senderID != 100029990749091) return api.sendMessage(`[❗] Good luck next time :))`, event.threadID, event.messageID)
if(args.length == 0) api.sendMessage(`💟 BOSS ${name}\n🔰Sir, please wait a moment, bot system will restart in 5s`,event.threadID, () =>process.exit(1))
else{    
let time = args.join(" ");
setTimeout(() =>
api.sendMessage(`🔮Bot will restart after: ${gio}:${phut}:${giay} `, threadID), 0)
setTimeout(() =>
api.sendMessage("⌛Starting process from restart",event.threadID, () =>process.exit(1)), 1000*`${time}`);
}
}
