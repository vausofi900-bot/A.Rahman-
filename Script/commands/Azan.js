const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "autoazan",
  version: "1.0.3",
  permission: 2,
  credits: "Joy",
  description: "আজানের সময় অটো টেক্সট + ড্রাইভ ভয়েস",
  prefix: true,
  category: "Utility",
  usages: "",
  cooldowns: 5
};

let jobs = [];

// আলাদা আলাদা আজানের অডিও (Google Drive direct download link)
const azanAudios = {
  Fajr: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID1",
  Dhuhr: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID2",
  Asr: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID3",
  Maghrib: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID4",
  Isha: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID5"
};

async function fetchPrayerTimes() {
  try {
    const res = await axios.get("http://api.aladhan.com/v1/timingsByCity", {
      params: {
        city: "Dhaka",
        country: "Bangladesh",
        method: 2
      }
    });
    return res.data.data.timings;
  } catch (err) {
    console.error("আজানের টাইম আনা যায় নাই:", err.message);
    return null;
  }
}

async function getAudioStream(url, name) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  const filePath = path.join(__dirname, `${name}.mp3`);
  fs.writeFileSync(filePath, Buffer.from(res.data));
  return fs.createReadStream(filePath);
}

module.exports.run = async function ({ api, event }) {
  const threadID = event.threadID;

  // আগের জব বন্ধ
  jobs.forEach(job => job.stop());
  jobs = [];

  const timings = await fetchPrayerTimes();
  if (!timings) return api.sendMessage("❌ আজানের সময় আনতে সমস্যা হয়েছে।", threadID);

  const messages = {
    Fajr: "🕌 ফজরের নামাজের সময় হয়েছে।",
    Dhuhr: "🕌 যোহরের নামাজের সময় হয়েছে।",
    Asr: "🕌 আসরের নামাজের সময় হয়েছে।",
    Maghrib: "🕌 মাগরিবের নামাজের সময় হয়েছে।",
    Isha: "🕌 ইশার নামাজের সময় হয়েছে।"
  };

  for (let key in messages) {
    const [hour, minute] = timings[key].split(":");
    const cronExp = `0 ${minute} ${hour} * * *`;

    const job = cron.schedule(cronExp, async () => {
      try {
        const audioStream = await getAudioStream(azanAudios[key], key);
        api.sendMessage(
          {
            body: messages[key],
            attachment: audioStream
          },
          threadID
        );
      } catch (e) {
        console.error("অডিও পাঠাতে সমস্যা:", e.message);
      }
    }, {
      scheduled: true,
      timezone: "Asia/Dhaka"
    });

    jobs.push(job);
  }

  api.sendMessage("✅ আজানের অটো-নোটিফিকেশন (ড্রাইভ ভয়েস সহ) চালু হয়েছে।", threadID);
};
