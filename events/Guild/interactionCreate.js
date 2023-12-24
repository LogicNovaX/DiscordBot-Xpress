const { EmbedBuilder } = require('discord.js');
const config = require("../../config");
const { log } = require("../../functions-utils");
const ExtendedClient = require("../../class/ExtendedClient");

const cooldown = new Map();

module.exports = {
  event: "interactionCreate",
  /**
   *
   * @param {ExtendedClient} client
   * @param {import('discord.js').Interaction} interaction
   * @returns
   */
  run: async (client, interaction) => {
    if (!interaction.isCommand()) return;

    if (
      config.handler.commands.slash === false &&
      interaction.isChatInputCommand()
    )
      return;
    if (
      config.handler.commands.user === false &&
      interaction.isUserContextMenuCommand()
    )
      return;
    if (
      config.handler.commands.message === false &&
      interaction.isMessageContextMenuCommand()
    )
      return;

    const command = client.collection.interactioncommands.get(
      interaction.commandName
    );

    if (!command) return;

    try {
      if (command.options?.developers) {
        if (
          config.users?.developers?.length > 0 &&
          !config.users?.developers?.includes(interaction.user.id)
        ) {
          const developers = config.messageSettings.developerMessage !== undefined &&
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

          await interaction.reply({ embeds: [embed], ephemeral: true })

          return;
        } else if (config.users?.developers?.length <= 0) {
const missingDevIDS = config.messageSettings.missingDevIDsMessage !== undefined &&
              config.messageSettings.missingDevIDsMessage !== null &&
              config.messageSettings.missingDevIDsMessage !== ""
                ? config.messageSettings.missingDevIDsMessage
                : "This command is only for the developers of this bot, but unable to execute this command due to lack or missing user ID's in the configuration file!";

const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024'})
            .setTitle("New Error!")
            .setDescription("> An Error has Occurred!")
            .addFields({
              name: "Error Comment",
              value: "```diff\n- " + missingDevIDS + "```", 
            })
          .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

          await interaction.reply({ embeds: [embed], ephemeral: true })

          return;
        }
      }

      if (command.options?.nsfw && !interaction.channel.nsfw) {
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

          await interaction.reply({ embeds: [embed], ephemeral: true })

        return;
      }

      if (command.options?.permissions && !interaction.member.permissions.has(command.options?.permissions)) {
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

          await interaction.reply({ embeds: [embed], ephemeral: true })
        return;
      }

      if (command.options?.cooldown) {
        const isGlobalCooldown = command.options.globalCooldown;
        const cooldownKey = isGlobalCooldown ? 'global_' + command.structure.name : interaction.user.id;
        const cooldownFunction = () => {
          let data = cooldown.get(cooldownKey);

          data.push(interaction.commandName);

          cooldown.set(cooldownKey, data);

          setTimeout(() => {
            let data = cooldown.get(cooldownKey);

            data = data.filter((v) => v !== interaction.commandName);

            if (data.length <= 0) {
              cooldown.delete(cooldownKey);
            } else {
              cooldown.set(cooldownKey, data);
            }
          }, command.options.cooldown);
        };

        if (cooldown.has(cooldownKey)) {
          let data = cooldown.get(cooldownKey);

          if (data.some((v) => v === interaction.commandName)) {
            const cooldownMessage = isGlobalCooldown 
              ? config.messageSettings.globalCooldownMessage ?? "Wooh buddy, Global Cooldown is enabled!" 
              : config.messageSettings.cooldownMessage ?? "Wooh buddy, Cooldown is enabled!";

            const embed = new EmbedBuilder()
            .setColor('#00aaff')
            .setAuthor({ name: 'BotName', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024'})
            .setTitle("New Error!")
            .setDescription("> An Error has Occurred!")
            .addFields({
              name: "Error Comment",
              value: "```diff\n- " + cooldownMessage + "```", 
            })
          .setFooter({ text: 'Made By: LogicNovaX', iconURL: 'https://cdn.discordapp.com/avatars/1188106377428733992/0d32bcf3cb3c01a3a28ab82185920213.png?size=1024' });

          await interaction.reply({ embeds: [embed], ephemeral: true })

            return;
          } else {
            cooldownFunction();
          }
        } else {
          cooldown.set(cooldownKey, [interaction.commandName]);
          cooldownFunction();
        }
      }

      command.run(client, interaction);
    } catch (error) {
      log(error, "err");
    }
  },
};