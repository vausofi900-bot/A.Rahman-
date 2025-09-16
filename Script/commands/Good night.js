module.exports.config = {
    name: "AIGoodNight",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "কেউ গুড নাইট লিখলে নাম মেনশন করে রিপ্লাই ও রিয়েক্ট দিবে (Spam Fixed)",
    commandCategory: "AI",
    usages: "auto goodnight",
    cooldowns: 5,
};

// --- Anti Spam System ---
const talkedRecently = new Set();

module.exports.handleEvent = function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body) return;

    // --- Anti Spam Check ---
    if (talkedRecently.has(senderID)) return;

    const text = body.toLowerCase();

    // "good night" বা "গুড নাইট" চেক
    if (text.includes("good night") || text.includes("গুড নাইট")) {
        api.getUserInfo(senderID, (err, info) => {
            if (err) return;
            const userName = info[senderID].name;

            // রিপ্লাই মেসেজ লিস্ট
            const replies = [
                `🌙 শুভ রাত্রি ${userName}, সুন্দর স্বপ্ন দেখো ✨`,
                `😴 গুড নাইট ${userName}, ভালো করে ঘুমিও 💖`,
                `💤 ${userName}, রাতটা শান্তিময় কাটুক 🌌`,
                `🌙 ${userName}, গুড নাইট! আগামীকাল নতুন উদ্যমে দেখা হবে ☀️`
            ];

            const reply = replies[Math.floor(Math.random() * replies.length)];

            api.sendMessage(
                {
                    body: reply,
                    mentions: [{ tag: userName, id: senderID }]
                },
                threadID,
                (err, infoMsg) => {
                    if (!err) {
                        // রিয়েক্ট দিবে 🌙
                        api.setMessageReaction("🌙", messageID, (err) => {}, true);
                    }
                },
                messageID
            );

            // --- Anti Spam Timer (10 সেকেন্ড) ---
            talkedRecently.add(senderID);
            setTimeout(() => {
                talkedRecently.delete(senderID);
            }, 10000);
        });
    }
};

module.exports.run = async function () {
    // এই কমান্ড আলাদা করে রান করার দরকার নেই
    return;
};
