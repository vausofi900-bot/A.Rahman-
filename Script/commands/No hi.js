module.exports.config = {
    name: "AIHiWarning",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SaGor",
    description: "কেউ হাই লিখলে তাকে সালামের ফজিলত মনে করিয়ে দিবে (No Spam)",
    commandCategory: "AI",
    usages: "auto hi warning",
    cooldowns: 5,
};

// --- Anti Spam System ---
const remindedRecently = new Set();

module.exports.handleEvent = function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    if (!body) return;

    const text = body.trim().toLowerCase();

    // "hi" বা "হাই" শুধু এককথা হলে চেক করবে
    if (text === "hi" || text === "হাই" || text === "Hi") {
        if (remindedRecently.has(senderID)) return; // no spam

        api.getUserInfo(senderID, (err, info) => {
            if (err) return;
            const userName = info[senderID].name;

            const reminder = `🤲 ${userName}, "হাই" বলার পরিবর্তে সালাম দিন।\n\n🕌 আগে সালাম দিলে ৯০ নেকি পাওয়া যায়, আর সালাম প্রচারে অনেক সওয়াব আছে।\n\n✨ আসসালামু আলাইকুম লিখুন, ইনশাআল্লাহ আপনি উত্তম প্রতিদান পাবেন।`;

            api.sendMessage(reminder, threadID, () => {
                api.setMessageReaction("☪️", messageID, () => {}, true);
            });
        });

        // --- Anti Spam Add ---
        remindedRecently.add(senderID);
        setTimeout(() => {
            remindedRecently.delete(senderID);
        }, 10000); // 10 সেকেন্ড cooldown
    }
};

module.exports.run = function () {};
