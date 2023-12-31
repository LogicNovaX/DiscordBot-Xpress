const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder,
} = require("discord.js");
const ExtendedClient = require("../../../class/ExtendedClient");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("Execute some codes")
        .addStringOption((option) =>
            option
                .setName("code")
                .setDescription("This is a code to be executed")
                .setRequired(true)
        ),
    options: {
        developers: true,
    },
    /**
     * @param {ExtendedClient} client
     * @param {ChatInputCommandInteraction<true>} interaction
     */
    run: async (client, interaction, args) => {
        await interaction.deferReply();

        const code = interaction.options.getString("code");

        try {
            let executedEvalValue = eval(code);

            if (typeof executedEvalValue !== 'string') executedEvalValue = require('util').inspect(executedEvalValue);

            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Code executed")
                        .setDescription(`Executed the code, No errors found`)
                        .setColor('Green')
                ],
                files: [
                    new AttachmentBuilder(Buffer.from(`${executedEvalValue}`.replace(new RegExp(`${client.token}`, 'g'), '"[CLIENT TOKEN HIDDEN]"'), 'utf-8'), { name: 'output.javascript' })
                ]
            });
        } catch (err) {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription(`Something went wrong, Error:`)
                        .setColor('Red')
                ],
                files: [
                    new AttachmentBuilder(Buffer.from(`${err}`, 'utf-8'), { name: 'text-output.txt' })
                ]
            });
        };

    },
};