module.exports = {
    client: {
        bot_token: "Your Bot token (USE .env FOR SAFETY)",
        id: "Your Bot ID (USE .env FOR SAFETY)",
    },
    handler: {
        prefix: "?",
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true,
        },
        mongodb: {
            uri: "Your MongoDB URI string (USE .env FOR SAFETY)",
            toggle: false,
        },
    },
    users: {
        developers: ["Your account ID"],
    },
    development: { 
        enabled: true,
        guild: "Enter your guild ID here or you can use .env",
    }, 
    messageSettings: {
        nsfwMessage: "The current channel your in is not an NSFW Channel",
        developerMessage: "Your not authorized nor the developer of this bot. You cannot use this command",
        cooldownMessage: "WOOOH, Budddy slow down. You're going to fast with this command",
        globalCooldownMessage: "WOOOH, Budddy slow down. This command is on global cooldown",
        notHasPermissionMessage: "You currently don't have permission to use this command",
        notHasPermissionComponent: "You currently don't have permission to use this component",
        missingDevIDsMessage: "This command is only for the developers of this bot, but unable to execute this command due to lack or missing user ID's in the configuration file"
    }
};