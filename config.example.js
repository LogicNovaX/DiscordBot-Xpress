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
      nsfwMessage: "This channel isn't NSFW marked!",
      developerMessage: "Insufficient permissions to access this category",
      cooldownMessage: "Wooh buddy, Cooldown is enabled!",
      globalCooldownMessage: "Wooh buddy, Global Cooldown is enabled!",
      notHasPermissionMessage: "Insufficient permissions to access this category!",
      notHasPermissionComponent: "Insufficient permissions to access this category!",
      missingDevIDsMessage: "This command is only for the developers of this bot, but unable to execute this command due to lack or missing user ID's in the configuration file!"
  }
};