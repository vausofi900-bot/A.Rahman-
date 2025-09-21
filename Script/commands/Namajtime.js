const schedule = require("node-schedule");

module.exports.config = {
    name: "NamazEveryone",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "নামাজের সময় হলে সবাইকে মেনশন করে নামাজে যাওয়ার জন্য বলবে",
    commandCategory: "Utility",
    usages: "namaz everyone reminder",
    cooldowns: 5,
};

// --- নামাজের সময় ---
const prayerTimes = {
    fajr: "05:00",
    dhuhr: "12:45",
    asr: "16:00",
    maghrib: "18:10",
    isha: "19:30"
};

// --- নামাজের মেসেজ ---
const prayerMessages = {
    fajr: "🕌 ফজরের নামাজের সময় হয়েছে। সবাই নামাজে যান।",
    dhuhr: "🕌 যোহরের নামাজের সময় হয়েছে। সবাই নামাজে যান।",
    asr: "🕌 আসরের নামাজের সময় হয়েছে। সবাই নামাজে যান।",
    maghrib: "🕌 মাগরিবের নামাজের সময় হয়েছে। সবাই নামাজে যান।",
    isha: "🕌 ইশার নামাজের সময় হয়েছে। সবাই নামাজে যান।"
};

module.exports.run = async function ({ api, event }) {
    const { threadID } = event;

    // প্রতিটি নামাজের জন্য শিডিউলার সেট
    Object.keys(prayerTimes).forEach(prayer => {
        const [hour, minute] = prayerTimes[prayer].split(":");

        schedule.scheduleJob({ hour: parseInt(hour), minute: parseInt(minute) }, async () => {
            try {
                // থ্রেডের সব ইউজারের আইডি আনো
                const threadInfo = await api.getThreadInfo(threadID);
                const mentions = threadInfo.participantIDs.map(id => ({
                    tag: "@everyone", // মেনশনের টেক্সট
                    id
                }));

                api.sendMessage(
                    {
                        body: `📢 ${prayerMessages[prayer]}\n\n@everyone`,
                        mentions: mentions
                    },
                    threadID
                );
            } catch (err) {
                console.error("Namaz Reminder Error:", err);
            }
        });
    });

    api.sendMessage("✅ Everyone Mention সহ নামাজ Reminder চালু হয়েছে!", threadID);
};
