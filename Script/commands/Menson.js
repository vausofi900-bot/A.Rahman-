const fs = require("fs");

module.exports.config = {
    name: "mensonall",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "mention লিখলে গ্রুপের সবাইকে আলাদা আলাদা মেসেজে mention করবে",
    commandCategory: "group",
    usages: "mensonall",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
    try {
        const threadInfo = await api.getThreadInfo(event.threadID);
        const members = threadInfo.userInfo;

        if (!members || members.length === 0) {
            return api.sendMessage("❌ গ্রুপে কাউকে খুঁজে পাওয়া যায়নি।", event.threadID, event.messageID);
        }

        api.sendMessage(`প্রিন্স স্যার এই গ্রুপে মোট ${members.length} জন সবাইকে  mention করা হলো🥰...`, event.threadID);

        for (let i = 0; i < members.length; i++) {
            let user = members[i];
            let mentions = [{
                id: user.id,
                tag: user.name
            }];

            let msg = `👉 ${i + 1}. ${user.name} কলে আসেন🥰`;

            // প্রতি মেসেজের মাঝে 1.5 সেকেন্ড Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            api.sendMessage({ body: msg, mentions }, event.threadID);
        }

        api.sendMessage("✅প্রিন্স স্যার সবাইকে mention করা শেষ হয়েছে😘🥰", event.threadID);

    } catch (e) {
        console.log(e);
        return api.sendMessage("❌ সবাইকে mention করতে সমস্যা হয়েছে।", event.threadID, event.messageID);
    }
};
