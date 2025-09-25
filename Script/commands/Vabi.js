module.exports.config = {
    name: "mentionReply",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SaGor",
    description: "নির্দিষ্ট আইডি mention করলে বট নামসহ রিপ্লাই দিবে",
    commandCategory: "group",
    usages: "auto mention reply",
    cooldowns: 5,
};

module.exports.run = async function () {
    // এখানে কিছু দরকার নাই
};

module.exports.handleEvent = async function ({ api, event }) {
    try {
        // ✅ এখানে যাদের mention করলে বট রিপ্লাই দিবে তাদের UID লিখুন
        const targetUsers = [
            "", // এখানে প্রথম ইউজারের UID
            ""  // এখানে দ্বিতীয় ইউজারের UID
        ];

        if (event.mentions) {
            for (let uid in event.mentions) {
                if (targetUsers.includes(uid)) {
                    let name = event.mentions[uid]; // mention করা ইউজারের নাম
                    let replyMsg = `👉 ${name}\n🤧মেনশন করিও না সে এখন @শুভ্র চৌধুরী সাথে ব্যস্ত🥰`;

                    return api.sendMessage(replyMsg, event.threadID, event.messageID);
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
};
