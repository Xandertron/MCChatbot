# MCChatbot

I'd recommand just not using this but you do you

Usage:

1. Extract it somewhere, make sure it has its own folder, otherwise your a file hoarder.
2. Get a Discord bot. Theres thousands of tutorials, all you need is your token.
3. Fill out the data in config.json.
4. Run `npm install` in the directory. It will take awhile.
5. Finally run `node index.js`

6. When the bot starts, you may run #connect <host> [port] to connect to a server, #viewer to start/stop the viewer, and #disconnect to leave the server (also stops the viewer) .


config.json:

1. `token` is your discord bot token.
2. `listenid` is your discord id, so only you can use it to prevent others from abusing it.
3. `prefix` is what the bot will listen to when using commands.
4. `email` and `password`, self-explanatory, email becomes username if you leave password blank when using the offline mode.

future:
I may plan on making a version that uses the session system from mojang so im not storing passwords from other people, however im not sure if i can trust people to not try and login from public discord servers, maybe i could start with #login and tell them to stop being an idiot if they are not in dms
