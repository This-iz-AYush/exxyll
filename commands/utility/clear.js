const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  aliases: ["purge"],
  usage: "<ammount from 1 - 99>",
  description: "Clear chats from 1 - 99",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply(
        "You need `MANAGE_MESSAGES` Permission in order to run this command!"
      );
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.lineReply(
        `I Need \`MANAGE_MESSAGES\` Permission in order to run this command!`
      );
    if (!args[0])
      return message.channel.send(
        "Please specify a number of messages to delete range from 1 - 99"
      );
    if (isNaN(args[0])) return message.channel.send("Numbers are only allowed");
    if (parseInt(args[0]) > 99)
      return message.channel.send(
        "The max amount of messages that I can delete is 99"
      );
    await message.channel
      .bulkDelete(parseInt(args[0]) + 1)
      .catch((err) => message.channel.send(err));
    message.channel
      .send(
        new MessageEmbed()
          .setDescription("<a:verified_green:863233286690832404> | Deleted " + args[0] + " messages.")
          .setColor("#00FF00")
      )
      .then((m) => m.delete({ timeout: 2000 }));
  },
};