const fetch = require("node-fetch");

const evalCode = (language, code) => new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`https://emkc.org/api/v1/piston/execute`, {
        method: "POST",
        body: JSON.stringify({
          language: language,
          source: code,
          args: []
        })
      });
      const data = await res.json();
      return resolve(data);
    } catch (e) {
      console.error(e);
      return reject(e);
    }
  });


const hastebin = input => new Promise(async (resolve, reject) => {
    const res = await fetch(`https://hastebin.com/documents`, {
      method: "POST",
      body: input,
      headers: { "Content-Type": "text/plain" }
    });
    if (!res.ok) return reject(res.statusText);
    const { key } = await res.json();
    return resolve(`https://hastebin.com/${key}.txt`);
  });

module.exports = {
  evalCode,
  hastebin
};
