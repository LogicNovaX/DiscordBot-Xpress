const { ChannelType, Message, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const { log } = require("../../functions-utils");
const GuildSchema = require("../../models/guildSchema");
const ExtendedClient = require("../../class/ExtendedClient");

const cooldown = new Map();

module.exports = {
  event: "messageCreate",
  /**
   *
   * @param {ExtendedClient} client
   * @param {Message<true>} message
   * @returns
   */
  run: async (client, message) => {
    if (message.author.bot || message.channel.type === ChannelType.DM) return;

    if (!config.handler.commands.prefix) return;

    let prefix = config.handler.prefix;

    if (config.handler?.mongodb?.toggle) {
      try {
        const guildData = await GuildSchema.findOne({ guild: message.guildId });

        if (guildData && guildData?.prefix) prefix = guildData.prefix;
      } catch {
        prefix = config.handler.prefix;
      }
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandInput = args.shift().toLowerCase();

    if (!commandInput.length) return;

    let command =
      client.collection.prefixcommands.get(commandInput) ||
      client.collection.prefixcommands.get(
        client.collection.aliases.get(commandInput)
      );

    if (command) {
      try {
        if (
          command.structure?.permissions &&
          !message.member.permissions.has(command.structure?.permissions)
        ) {
          const noPermissions = config.messageSettings.notHasPermissionMessage !== undefined &&
          config.messageSettings.notHasPermissionMessage !== null &&
          config.messageSettings.notHasPermissionMessage !== ""
          ? config.messageSettings.notHasPermissionMessage
          : "Insufficient permissions to access this category!";
          const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024'})
            .setTitle("New Error!")
            .setDescription("> An Error has Occurred!")
            .addFields({
              name: "Error Comment",
              value: "```diff\n- " + noPermissions + "```", 
            })
          .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

          return message.channel.send({ embeds: [embed] });
        }

        if (command.structure?.developers) {
          if (!config.users.developers.includes(message.author.id)) {
            setTimeout(async () => {
              const developers =  config.messageSettings.developerMessage !== undefined &&
              config.messageSettings.developerMessage !== null &&
              config.messageSettings.developerMessage !== ""
              ? config.messageSettings.developerMessage
              : "Insufficient permissions to access this category!";
              const embed = new EmbedBuilder()
                .setColor('#00aaff')
                .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024'})
                .setTitle("New Error!")
                .setDescription("> An Error has Occurred!")
                .addFields({
                  name: "Error Comment",
                  value: "```diff\n- " + developers + "```", 
                })
              .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

              await message.channel.send({ embeds: [embed] });
            }, 5 * 1000);
          }

          return;
        }

        if (command.structure?.nsfw && !message.channel.nsfw) {
          const nsfwChannel = config.messageSettings.nsfwMessage !== undefined &&
            config.messageSettings.nsfwMessage !== null &&
            config.messageSettings.nsfwMessage !== ""
            ? config.messageSettings.nsfwMessage
            : "This channel isn't NSFW marked!";

          const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024'})
            .setTitle("New Error!")
            .setDescription("> An Error has Occurred!")
            .addFields({
              name: "Error Comment",
              value: "```diff\n- " + nsfwChannel + "```", 
            })
          .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

          return message.channel.send({ embeds: [embed] });
        }

        if (command.structure?.cooldown) {
          const cooldownFunction = () => {
            let data = cooldown.get(message.author.id);

            data.push(commandInput);

            cooldown.set(message.author.id, data);

            setTimeout(() => {
              let data = cooldown.get(message.author.id);

              data = data.filter((v) => v !== commandInput);

              if (data.length <= 0) {
                cooldown.delete(message.author.id);
              } else {
                cooldown.set(message.author.id, data);
              }
            }, command.structure?.cooldown);
          };

          if (cooldown.has(message.author.id)) {
            let data = cooldown.get(message.author.id);

            if (data.some((v) => v === commandInput)) {
              const cooldownMessage = config.messageSettings.cooldownMessage !== undefined &&
                config.messageSettings.cooldownMessage !== null &&
                config.messageSettings.cooldownMessage !== ""
                ? config.messageSettings.cooldownMessage
                : "Wooh buudy, Cooldown is enabled!";

              const embed = new EmbedBuilder()
                .setColor('#00aaff')
            .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/118810637742.8733992/0d32bcf3cb3c01a3a28ab82185920213png?size=1024'})
            .setTitle("New Error!")
            .setDescription("> An Error has Occurred!")
            .addFields({
              name: "Error Comment",
              value: "```diff\n- " + cooldownMessage + "```", 
            })
              .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

              return message.channel.send({ embeds: [embed] });
            } else {
              cooldownFunction();
            }
          } else {
            cooldown.set(message.author.id, [commandInput]);

            cooldownFunction();
          }
        }

        command.run(client, message, args);
      } catch (error) {
        console.log(error);
        log("err");
      }
    }
  },
};