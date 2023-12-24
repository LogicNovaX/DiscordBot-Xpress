module.exports = {
    client: {
        bot_token: "Token Here (.env for Safety)",
        id: "Bot-ID (.env for Safety)",
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
            uri: "MongoDB URI (.env for Safety)",
            toggle: false,
        },
    },
    users: {
        developers: ["Your account ID"],
    },
    development: { 
        enabled: false,
        guild: "Enter your guild ID here or you can use .env",
    }, 
  messageSettings: {
      nsfwMessage: "This channel isn't NSFW marked!",
      developerMessage: "Insufficient permissions to access this category",
      cooldownMessage: "Wooh buddy, Cooldown is enabled!",
      globalCooldownMessage: "Wooh buddy, Global Cooldown is enabled!",
      notHasPermissionMessage: "Insufficient permissions to access this category!",
      notHasPermissionComponent: "Insufficient permissions to access this category!",
      missingDevIDsMessage: "This command is only for the developers of this bot, but unable to execute this command due to lack or missing user ID's in the configuration file!"
  }
};
