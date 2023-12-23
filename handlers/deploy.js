const { REST, Routes } = require("discord.js");
const { log } = require("../functions-utils");
const config = require("../config");
const ExtendedClient = require("../class/ExtendedClient");

/**
 *
 * @param {ExtendedClient} client
 */
module.exports = async (client) => {
  const rest = new REST({ version: "10" }).setToken(
    process.env.CLIENT_TOKEN || config.client.token
  );

  try {
    log(
      "Started loading the application commands (This Could Take A Couple Seconds)",
      "info"
    );

    function isSnowflake(id) {
      return /^\d+$/.test(id);
  }
  
  const guildId = process.env.GUILD_ID || config.development.guild;
  
  if (!isSnowflake(guildId)) {
      log("The GUILD_ID is Missing... Please set it in the config or .env file or atleast disable the development file in the config!", "err");
      return; 
  }
    
   if (config.development && config.development.enabled) {
      await rest.put(
          Route(process.env.CLIENT_ID || config.client.id, guildId),
          {
              body: client.applicationcommandsArray,
          }
      );
      log(`Successfully loaded and enabled the applications to the guild: ${guildId}`, "done");
    } else { 
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID || config.client.id),
        {
          body: client.applicationcommandsArray,
        }
      );
      log("Successfully loaded and enabled the application commands GLOBALLY to the Discord API", "done");
    }
  } catch (e) {
    log(`Unable to load the application commands to the Discord API: ${e.message}`, "err");
  }
};