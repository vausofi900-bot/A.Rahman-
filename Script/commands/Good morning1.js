module.exports.config = {
    name: "AIMorning",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "Good Morning মেসেজে রিপ্লাই ও রিয়েক্ট দিবে নাম মেনশন সহ (Spam Fixed)",
    commandCategory: "AI",
    usages: "auto morning",
    cooldowns: 5,
};

// --- Anti Spam System ---
const talkedRecently = new Set();

module.exports.handleEvent = function({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body) return;

    // স্প্যাম প্রটেকশন
    if (talkedRecently.has(senderID)) return;

    const text = body.toLowerCase();

    // চেক করবো "good morning" আছে কি না
    if (text.includes("good morning","Gd m9") || text.includes("গুড মর্নিং","শুভ সকাল")) {

        // ইউজারের নাম বের করবো
        api.getUserInfo(senderID, (err, info) => {
            if (err) return;
            const userName = info[senderID].name;

            // রিপ্লাই দিবে নাম মেনশন করে
            api.sendMessage(
                {
                    body: `☀️ শুভ সকাল ${userName}! তোমার দিনটা সুন্দর কাটুক 🌸`,
                    mentions: [{ tag: userName, id: senderID }]
                },
                threadID,
                messageID
            );

            // রিয়েক্ট দিবে ☀️
            api.setMessageReaction("☀️", messageID, () => {}, true);
        });

        // কুলডাউন সেট করা হলো (5 সেকেন্ড)
        talkedRecently.add(senderID);
        setTimeout(() => {
            talkedRecently.delete(senderID);
        }, 5 * 1000);
    }
};

module.exports.run = function() {
    // রান কমান্ড দরকার নেই
};
