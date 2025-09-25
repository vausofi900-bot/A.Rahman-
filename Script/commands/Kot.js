module.exports.config = {
    name: "mentionReply",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "নির্দিষ্ট আইডি mention করলে বট আলাদা আলাদা রিপ্লাই দিবে",
    commandCategory: "group",
    usages: "auto mention reply",
    cooldowns: 5,
};

module.exports.run = async function () {
    // এখানে কিছু লাগবে না
};

module.exports.handleEvent = async function ({ api, event }) {
    try {
        // ✅ এখানে UID + Reply Message সেট করুন
        const targetUsers = {
            "61579865605110": "👉 {name}\n😎 ও এখন PUBG খেলায় ব্যস্ত 🎮",
            "100094876543210": "👉 {name}\n🥰 ও এখন শুভ্র চৌধুরীর সাথে রোমান্স করছে 💕",
            "10001122334455": "👉 {name}\n🤧 মেনশন করো না, সে এখন ঘুমাচ্ছে 😴"
        };

        const mentions = Object.keys(event.mentions || {});
        if (mentions.length > 0) {
            for (let uid of mentions) {
                if (targetUsers[uid]) {
                    let name = event.mentions[uid];
                    let replyMsg = targetUsers[uid].replace("{name}", name);

                    return api.sendMessage(replyMsg, event.threadID, event.messageID);
                }
            }
        }
    } catch (err) {
        console.error("mentionReply error:", err);
    }
};
