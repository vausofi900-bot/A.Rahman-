module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "CatalizCS", //fixing ken gusler
	description: "Notify bot or group member with random gif/photo/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`[${global.config.PREFIX} ]  ${(!global.config.BOTNAME) ? "bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`আসসালামুআলাইকুম 💖
____________________________________
আমি একটি ইসলামিক রোবট🤖
আমি আত- তাক্বওয়া ফাউন্ডেশন এর হয়ে কাজ করি 🥰
আমাকে কেউ আড্ডা গ্রুপে এড করবেন না 🙏
____________________________________\n\n আমার বিষয়ে জানতে ${global.config.PREFIX}help ফাউন্ডেশনের সভাপতি মোঃ মোর্শেদ ও ফাউন্ডেশন এর গ্রুপ লিডার মোঃ জাকারিয়া এবং মোঃ শামীম ওসমান সাথে আলোচনা করুন
\n\অযথা আমাকে বিরক্ত করবেন না:\n${global.config.PREFIX}mark (text)\n${global.config.PREFIX}lexi (text)\n${global.config.PREFIX}trump (text)\n${global.config.PREFIX}info
____________________________________
-
`, attachment: fs.createReadStream(__dirname + "/cache/joinmp4/emon1.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `${threadID}.gif`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "🫡আসসালামু আলাইকুম🌺                                            প্রিয় মেম্বার  {name} .\nআপনাকে\n🌸 {threadName} 🖤\n                   পক্ষ থেকে স্বাগতম     {type}      আপনি গ্রুপের (:̲̅:̲̅:̲̅[̲̅:{soThanhVien}:]̲̅:̲̅:̲̅:̲̅) তম মেম্বার🫶❤️🥀.\n-----------------------------------------\nআমার নাম হল বেবি 🍒🥰\n আমাকে নিয়ে কোন সমস্যা হলে অবশ্যই আমার বস প্রিন্সে রে জানাবেন🖤🥀\n---------------------------------------------\n\nআমার বস প্রিন্সের পক্ষ থেকে আপনাকে গ্রুপে স্বাগতম\n গ্রুপের নিয়ম জানতে লিখুন👇👇👇\n----------------------------------Rules\n." : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
  }
  
