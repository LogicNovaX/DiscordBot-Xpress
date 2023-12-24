const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js");
const config = require('../config');
const commands = require("../handlers/commands");
const events = require("../handlers/events");
const deploy = require("../handlers/deploy");
const mongoose = require("../handlers/mongoose");

module.exports = class extends Client {
    collection = {
        interactioncommands: new Collection(),
        prefixcommands: new Collection(),
        aliases: new Collection(),
        components: {
        buttons: new Collection(),
        selects: new Collection(),
        modals: new Collection()
      }
    };
    applicationcommandsArray = [];

    constructor() {
        super({
            intents: [Object.keys(GatewayIntentBits)],
            partials: [Object.keys(Partials)],
        });
    };

    start = async () => {
        commands(this);
        events(this);

        if (config.handler.mongodb.toggle) mongoose();

        await this.login(process.env.BOT_TOKEN || config.client.bot_token);

        if (config.handler.deploy) deploy(this, config);

        let acts = [
            {
                name: "DiscordBot-Xpress",
                type: 0,
                status: "idle",
            },
            {
                name: `${this.guilds.cache.size} Guilds!`,
                type: 0,
                status: "idle"
            },
        ];
        setInterval(async () => {
            const currentAct = acts.shift();
            this.user.setPresence({
                activities: [
                    {
                        name: currentAct.name.toString(),
                        type: currentAct.type,
                    },
                ],
                status: currentAct.status,
            });
            acts.push(currentAct);
        }, 3000);
    };
};