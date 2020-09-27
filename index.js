const client = new (require("discord.js")).Client();
const { TOKEN, PREFIX } = require("./config");
const { hastebin, evalCode } = require("./utils");
const languages = require("./languages");

client
  .on("ready", () => console.log("Connected to Discord API"))
  .on("message", async message => {
    if (message.author.bot || !message.guild || !message.content.startsWith(PREFIX))return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    if(args[0] && Object.keys(languages).some(l => RegExp("^```" + l + "\\s?[\\s\\S]*```$", "g").test(args.join(" ")))) {
      message.react("⏱️");
      let lang = Object.keys(languages).find(x => args.join(" ").includes(x));
      let code = args.join(" ").slice(3 + lang.length, -3).trim();
      if (code.length <= 1)return message.channel.send(":x: | Please include a code to eval!");
      const output = await evalCode(languages[lang], code);
      if (output.output.length <= 0)return message.channel.send("```" + "Empty output" + "```");
      if (output.output.length > 2006) {
        let bin = await hastebin(output.output).catch(() => {
          return message.channel.send(":x: | 404");
        });
        return message.channel.send(`:white_check_mark: | Output was too long!\n<${bin}>`);
      }
      message.channel.send("```" + output.output + "```");
    }
  }).login(TOKEN);
