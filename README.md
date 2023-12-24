# DiscordBot-Xpress

**DiscordBot-Xpress** is a powerful and customizable Discord bot template designed to help you kickstart your own bot development. With a user-friendly structure and extensive features, it provides a solid foundation for building your own unique Discord bot

## Features

- Easy-to-use and well-organized code structure
- Built with JavaScript and the Discord.js library (v14)
- Command handling system with customizable prefix
- Event handling system for handling various Discord events
- Modular design for easy addition of new commands and events
- Example commands and events included as a starting point
- Support for interacting with the Discord API using the powerful Discord.js library

## Requirements
### Packages:
- **chalk** v2.4.2
- **discord.js** v^14.13.0
- **dotenv** v^latest
- **mongoose** v^latest

> **Warning**
> Installing any version from the package `chalk` that is over **v2.4.2**, it will throw an error that you must enable ES6 modules, while this handler uses CommonJS modules.

### Platforms:
- **Node.js** v16.9.0 or newer

## Getting Started

To get started with DiscordBot-Xpress, follow these steps:

1. Clone or download the repository to your local machine
2. Install the required dependencies by running `npm install chalk@2.4.2 discord.js@latest dotenv mongoose` in the project directory
3. Fill in the `config.js` and enter your bot token and other configuration details or use env like it said
4. Customize the bot by adding your own commands and events in the respective folders
5. You can now run the bot by using `node index.js` command

For more detailed instructions and examples, please refer to the [documentation](https://github.com/logicnovax/DiscordBot-Xpress/wiki)

> **Important**
> Sharing your Discord bot's token to anyone is a **very risky** move since you'll **allow them** to **use your bot**. This is also a dangerous move for the MongoDB database, we don't recommend you to use any public URIs or sharing your own database connection URL

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the [Code Of Conduct](https://github.com/logicnovax/DiscordBot-Xpress/blob/main/CODE_OF_CONDUCT.md)

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/logicnovax/DiscordBot-Xpress/blob/main/LICENSE) file for more details

## Contact

If you have any questions or need further assistance, feel free to contact the project maintainer at [xyronsdesk@gmail.com](xyronsdesk@gmail.com)
