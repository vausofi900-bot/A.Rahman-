const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
    name: "azan",
    version: "1.3.0",
    hasPermssion: 0,
    credits: "SaGor",
    description: "ফজর ও ইশার জন্য ৫ মিনিট আগে সতর্ক + API ভিত্তিক আজান",
    commandCategory: "system",
    usages: "auto azan",
    cooldowns: 5,
};

// আযানের অডিও ফাইল (cache ফোল্ডারে)
const azanAudioNormal = path.join(__dirname, "cache", "azan.mp3");
const azanAudioFajr = path.join(__dirname, "cache", "fajr.mp3");
const azanAudioIsha = path.join(__dirname, "cache", "isha.mp3");

// আপনার শহর/দেশ অনুযায়ী সেট করুন
const location = {
    city: "Dhaka",
    country: "Bangladesh"
};

// Anti-spam cache
let azanPlayedToday = {};
let alertSentToday = {};

// Timer
module.exports.run = async function ({ api, event }) {
    api.sendMessage("⏳ আজান সিস্টেম চালু হয়েছে (ফজর/ইশা ৫ মিনিট আগে সতর্ক) ...", event.threadID);

    setInterval(async () => {
        try {
            const today = new Date().toISOString().split("T")[0]; // 2025-09-16

            const response = await axios.get(
                `https://api.aladhan.com/v1/timingsByCity?city=${location.city}&country=${location.country}&method=2`
            );

            const timings = response.data.data.timings;
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const currentTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

            for (const [prayer, time] of Object.entries(timings)) {
                const [prayerHour, prayerMinute] = time.slice(0, 5).split(":").map(Number);
                const key = `${today}-${prayer}`;

                // --- ফজর/ইশা ৫ মিনিট আগে সতর্ক বার্তা ---
                if ((prayer.toLowerCase() === "fajr" || prayer.toLowerCase() === "isha") 
                    && !alertSentToday[key]) {
                    const alertHour = prayerHour;
                    const alertMinute = prayerMinute - 5;
                    let alertTime = new Date();
                    alertTime.setHours(alertHour, alertMinute);

                    if (alertTime.getHours() === hours && alertTime.getMinutes() === minutes) {
                        alertSentToday[key] = true;
                        const alertMsg = prayer.toLowerCase() === "fajr" 
                            ? "🌅 ফজরের আজান ৫ মিনিটের মধ্যে শুরু হবে!" 
                            : "🌙 ইশার আজান ৫ মিনিটের মধ্যে শুরু হবে!";
                        api.sendMessage(alertMsg, event.threadID);
                    }
                }

                // --- আসল আযান বাজানো ---
                if (currentTime === time.slice(0, 5) && !azanPlayedToday[key]) {
                    azanPlayedToday[key] = true;

                    let audioFile = azanAudioNormal;
                    let messageBody = `📢 এখন ${prayer.toUpperCase()} এর আযান`;

                    if (prayer.toLowerCase() === "fajr") {
                        audioFile = azanAudioFajr;
                        messageBody = "🌅 ফজরের আযান সময় হয়েছে";
                    } else if (prayer.toLowerCase() === "isha") {
                        audioFile = azanAudioIsha;
                        messageBody = "🌙 ইশার আযান সময় হয়েছে";
                    }

                    api.sendMessage(
                        {
                            body: messageBody,
                            attachment: fs.createReadStream(audioFile),
                        },
                        event.threadID
                    );
                }
            }
        } catch (err) {
            console.error("API থেকে নামাজের সময় আনার সময় ত্রুটি:", err.message);
        }
    }, 60000); // প্রতি মিনিটে চেক
};
