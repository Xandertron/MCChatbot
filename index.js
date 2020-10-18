const mc = require('minecraft-protocol');
const Discord = require("discord.js");
const dclient = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix
var connected = false
console.log("Starting...")
dclient.login(config.token);

dclient.on("ready", () => {
	console.log("[MCCHATBOT] IM READDY!!!!! WOOOOOOO");
});

dclient.on("message", message => {
							  
	if (message.author.bot) return;
	//his is checking for your id, i'd advise keeping it to prevent abuse from users, otherwide delete the below line
	if (message.author.id != config.listenid) return;
	//if we didnt get a command from the user then send it as a chat message
	if (!message.content.startsWith(prefix)) {
		if (connected) {
			mcclient.write('chat', {message: message.content});
		}
	}
	//else handle commands
    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
    if (command == "connect") {
    	//permanently store the channel so we dont lose it like an idiot
    	chann = message.channel
    	//get the port from the arguments, or use the default (25565)
    	var nport = (args[1] == undefined) ? 25565 : args[1]
    	//finally create the client that will connect to the server with the options
    	mcclient = mc.createClient({
    		host: args[0],
    		port: nport,
		  	username: config.email,
		  	password: config.password
		});
		//self-explanatory
		mcclient.on('connect', function () {
			chann.send('Connected!')
			connected = true
		})
		mcclient.on('disconnect', function (packet) {
			chann.send('Disconnected: ' + packet.reason)
			mcclient.end()
			connected = false
		})
		//do shit when we get a chat packet
		mcclient.on('chat', function(packet) {
			//parse
			var msg = JSON.parse(packet.message);
			//i have to do this ugly undefined shit, because someone thought it would be a good idea to make 
			//no tranlate string for like tellraw n shit, ex. "Welcome to server!"
			if (msg.translate != undefined) {
			  if (msg.translate == "chat.type.text" || msg.translate == "chat.type.announcement"){
			    user = msg.with[0].text
			    usermessage = msg.with[1]
			    chann.send("["+user+"]: "+usermessage)
			  }
			}
			else{
				//you might wanna close your eyes, im not rewriting this
				bstr = ""
				if (msg.extra == undefined) return;
				msg.extra.forEach(
					function(object){
					  if (object.text != undefined){
					    bstr = bstr + object.text
					  }
					  if ((typeof object) == "string") {
					    bstr = bstr + object
					  }
					}
				)
				chann.send(bstr)
				bstr = ""
			}
		});
		mcclient.on('error', function () {});
    }
    if(command == "disconnect"){
    	if (connected) {
    		//tell the server we're disconnecting
    		mcclient.write(0xff, {reason: "client.disconnect"});
    		chann.send("Telling the server we're disconnecting")
    		//if the server hates you and doesnt accept then forcibly quit and kill the client, fuck you server
    		mcclient.end()
    	}
    }
});