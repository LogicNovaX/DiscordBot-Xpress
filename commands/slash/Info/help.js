const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../models/guildSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View all the possible commands!'),
    options: {
        cooldown: 15000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.deferReply();

        let prefix = config.handler.prefix;

        if (config.handler?.mongodb?.toggle) {
            try {
                const data = (await GuildSchema.findOne({ guild: message.guildId }));

                if (data && data?.prefix) prefix = data.prefix;
            } catch {
                prefix = config.handler.prefix;
            };
        };

        const mapIntCmds = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(No description)'}`);

        await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Help command')
                    .addFields(
                        { name: 'Slash commands', value: `${mapIntCmds.join('\n')}` }
                    )
            ]
        });

    }
};