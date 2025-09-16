module.exports.config = {
  'name': "salam",
  'version': "1.0.0",
  'hasPermssion': 0x0,
  'credits': "SaGor",
  'description': "auto reply to salam",
  'commandCategory': "noprefix",
  'usages': "assalamu alaikum",
  'cooldowns': 0x5,
  'dependencies': {
    'request': '',
    'fs-extra': '',
    'axios': ''
  }
};
module.exports.handleEvent = async ({
  api: _0x148a5f,
  event: _0x493360,
  Threads: _0x37f1c9,
  Users: _0x515a5a
}) => {
  var _0x39589b = await _0x515a5a.getNameUser(_0x493360.senderID);
  if (_0x493360.body.indexOf("assalamu alaikum") == 0 || _0x493360.body.indexOf("Assalamu alaikum") == 0 || _0x493360.body.indexOf("Assalamu Alaikum") == 0 || _0x493360.body.indexOf("Assalamualaikum") == 0 || _0x493360.body.indexOf("assalamualaikum") == 0 || _0x493360.body.indexOf("আসসালামু আলাইকুম") == 0 || _0x493360.body.indexOf("ASSALAMUALAIKUM") == 0 || _0x493360.body.indexOf("salam") == 0 || _0x493360.body.indexOf("সালাম") == 0 || _0x493360.body.indexOf("Assalamualikum") == 0) {
    const _0x2f4399 = global.nodemodule.request;
    const _0x3ceb97 = global.nodemodule["fs-extra"];
    var _0x2dda1 = ["https://i.imgur.com/JtenMLO.jpeg", "https://i.imgur.com/kjvZ9iO.jpeg", "https://i.imgur.com/uq1X7A4.jpeg", "https://i.imgur.com/dMRDrVv.jpeg", "https://i.imgur.com/cgtD9cs.jpeg", "https://i.imgur.com/YCVtjm3.jpeg", "https://i.imgur.com/RGUxNFG.jpeg", "https://i.imgur.com/dA3rT0E.jpeg", "https://i.imgur.com/oalGZL4.jpeg", "https://i.imgur.com/zhSVly7.jpeg", "https://i.imgur.com/1dCjbJt.jpeg", "https://i.imgur.com/q9TICm1.jpeg", "https://i.imgur.com/IlYTb8a.jpeg"];
    var _0x25c7ea = () => _0x148a5f.sendMessage({
      'body': "╭•┄┅═══❁🌺❁═══┅┄•╮\n   ওয়ালাইকুম সালাম-!!🖤\n╰•┄┅═══❁🌺❁═══┅┄•╯\n\n✿🦋༎প্রি্ঁয়্ঁ গ্রুপ্ঁ মে্ঁম্ঁবা্ঁর্ঁ " + _0x39589b + "༎✨🧡\n⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆",
      'attachment': _0x3ceb97.createReadStream(__dirname + "/cache/emon.jpeg")
    }, _0x493360.threadID, () => _0x3ceb97.unlinkSync(__dirname + "/cache/emon.jpeg"), _0x493360.messageID);
    return _0x2f4399(encodeURI(_0x2dda1[Math.floor(Math.random() * _0x2dda1.length)])).pipe(_0x3ceb97.createWriteStream(__dirname + "/cache/emon.jpeg")).on("close", () => _0x25c7ea());
  }
  module.exports.languages = {
    'vi': {
      'on': "Use it the wrong way and then complain",
      'off': "Stupid student, used it the wrong way",
      'successText': '🧠'
    },
    'en': {
      'on': 'on',
      'off': "off",
      'successText': "success!"
    }
  };
  module.exports.run = async ({
    event: _0x5e4c9f,
    api: _0x279809,
    Threads: _0x3cc446,
    getText: _0x2ac1c1
  }) => {
    let {
      threadID: _0x508bf2,
      messageID: _0x2c721d
    } = _0x5e4c9f;
    let _0x3aabec = (await _0x3cc446.getData(_0x508bf2)).data;
    if (typeof _0x3aabec.salam == "undefined" || _0x3aabec.salam == true) {
      _0x3aabec.salam = false;
    } else {
      _0x3aabec.salam = true;
    }
    await _0x3cc446.setData(_0x508bf2, {
      'data': _0x3aabec
    });
    global.data.threadData.set(_0x508bf2, _0x3aabec);
    _0x279809.sendMessage((_0x3aabec.salam == false ? _0x2ac1c1("off") : _0x2ac1c1('on')) + " " + _0x2ac1c1("successText"), _0x508bf2, _0x2c721d);
  };
};
module.exports.run = async ({
  api: _0x551781,
  event: _0x1fc433,
  args: _0x381847,
  Users: _0x4d4a20,
  Threads: _0x401c32,
  Currencies: _0x29bcd2
}) => {};
