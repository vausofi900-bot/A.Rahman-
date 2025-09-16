module.exports.config = {
    name: "badword",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "SaGor",
    description: "খারাপ/গালি শব্দ সনাক্ত করে রিপ্লাই দিবে (No Spam)",
    commandCategory: "no prefix",
    usages: "",
    cooldowns: 5,
};

// --- গালি/খারাপ শব্দের তালিকা ---
const badWords = [
    "Bal", "bal", "chudi", "madarchod", "bokachoda", 
    "choda", "chodna", "randi", "bolod", "fuck", "Bolod", 
    "bastard", "motherfucker", "বাল", "চোদানি", "মাগী", 
    "বেশ্যা", "চোদ", "চোদনা", "মাগির পোলা", "কুত্তা বাচ্চা"
];

// --- Anti Spam Cache ---
let talkedRecently = new Set();

module.exports.handleEvent = async function ({ api, event }) {
    if (!event.body) return;

    const message = event.body.toLowerCase();
    const found = badWords.some(word => message.includes(word));

    if (found) {
        // যদি ইতিমধ্যে এই ইউজারকে সতর্ক করা হয়ে থাকে, তাহলে আর রিপ্লাই দিবে না
        if (talkedRecently.has(event.senderID)) return;

        api.sendMessage("⚠️ দয়া করে খারাপ ভাষায় ব্যবহার করবেন না 🫡", event.threadID, event.messageID);
        api.setMessageReaction("😡", event.messageID, () => {}, true);

        // এই ইউজারকে 10 সেকেন্ডের জন্য ব্লক লিস্টে রাখল
        talkedRecently.add(event.senderID);
        setTimeout(() => {
            talkedRecently.delete(event.senderID);
        }, 10000); // 10 সেকেন্ড পরে আবার ধরবে
    }
};

module.exports.run = async function () {
    return; // no prefix system
};
