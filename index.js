//im 100% sure this works and wont error randomly
//ok maybe 75%
const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const Discord = require("discord.js");
const dclient = new Discord.Client();
const config = require("./config.json");
const prefix = "#"
let bot
var connected = false
var viewer = false
console.log("Starting...")
dclient.login(config.token);

dclient.on("ready", () => {
	console.log("[MCCHATBOT] IM READDY!!!!! WOOOOOOO");
});

dclient.on("message", message => {
	if (message.author.bot || message.author.id != config.ownerid) return;
	if (!message.content.startsWith(prefix)) {
		if (connected) {
			bot.chat(message.content)
		}
	}
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (command == "connect") {
		if (connected) return;
    	chann = message.channel
    	const nport = (args[1] == undefined) ? 25565 : args[1]
    	bot = mineflayer.createBot({
    		host: args[0],
    		port: nport,
		  	username: config.email,
		  	password: config.password
		});
		bot.on('login', function () {
			chann.send('Connected!')
			connected = true
		})
		bot.on('kicked', (reason, loggedIn) => {
			chann.send('Kicked: '+reason)
			connected = false
		})
		bot.on('message', function(json) {
			bstr = ""
			if (json.extra == undefined) return;
			json.extra.forEach(
				function(object){
				  if (object.text != undefined){
				    bstr = bstr + object.text
				  }
				  if ((typeof object) == "string") {
				    bstr = bstr + object
				  }
				}
			)
			if (bstr == "") return;
			chann.send(bstr)
			bstr = ""
		})
		bot.on('error', err => console.log(err))
    }
    if(command == "disconnect"){
    	if (connected) {
    		bot.quit()
    		chann.send("Telling the server we're disconnecting")
			bot.end()
			if (viewer) {
				bot.viewer.close()
				viewer = false
			}
			connected = false
		}
		else{
			chann.send("Not connected to anything!")
		}
	}
	if (command == "viewer"){
		if(!connected){
			chann.send("You need to be connected to a server to start the viewer!")
		}
		else if(viewer) {
			chann.send("Disabling the viewer!")
			bot.viewer.close()
			viewer = false
			return
		}
		else{
			mineflayerViewer(bot, { port: 8080 } )
			viewer = true
			chann.send("Attempting to start the viewer on port 8080, you may close it by running #viewer again")
		}
	}
});
