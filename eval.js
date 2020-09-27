const fetch = require("node-fetch");
module.exports = (language, code) => new Promise(async (resolve, reject) => {
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
