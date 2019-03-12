
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const keep_alive = require('./keep_alive.js')


const newUsers = [];

//Starting message
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(`Serving ${client.users.size} servers`);
  const startupchannel = client.channels.get('548057723527495720');
  startupchannel.send(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

// turns off bot
client.on('message', (message) => {
	if (message.content === '!!restart') {
		message.channel.send('Restarting...');
		client.destroy();
    client.login(token);
    message.channel.send('Restarted succesfully!')
	}
});

client.emit('guildCreate', guild => {
	// This event triggers when the bot joins a guild.
	const infoChannel = client.channels.get('548054411713445888');
	infoChannel.send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on('guildDelete', guild => {
	// this event triggers when the bot is removed from a guild.
	const infoChannel = client.channels.get('538238501452513282');
	infoChannel.send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

/* server welcome message
client.on('guildMemberAdd', (member) => {
	// eslint-disable-next-line prefer-const
	let welcomeChannel = client.channels.get('466628906514907147');
	welcomeChannel.send(new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('Welcome')
		.setDescription('Hey' + member + `Welcome to Huddha\'s lair! Please introduce yourself here as well as read <#465682713148653568> to familiarize yourself with the server.`
    )
		.setThumbnail('https://cdn.discordapp.com/attachments/511730996354351109/538192441690292224/huuuudha.png')
		.setTimestamp()
	);
});
*/

// server member left message
client.on('guildMemberRemove', (member) => {
	// eslint-disable-next-line prefer-const
	let goodbyeChannel = client.channels.get('548054411713445888');
	goodbyeChannel.send(new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('Goodbye')
		.setDescription(member + ' just left the server 🙁 (_|>__<)_| /// _|___|_')
		.setThumbnail('https://cdn.discordapp.com/attachments/511730996354351109/538192441690292224/huuuudha.png')
		.setTimestamp()
	);
});

// help module
client.on('message', message => {
	if (message.content === '!!help') {
		message.channel.send(new Discord.RichEmbed()
			.setColor('#0099fe')
			.setTitle('Help module')
			.setDescription('!!server-info - Sends server info \n!!ping - Shows how fast the bot responds')
			.setTimestamp()
		);
	}
});

// Custom log channel
client.on('message', message => {
	// eslint-disable-next-line prefer-const
	let logChannel = client.channels.get('548109471927369729');
	/*let authorName = null;
	if(message.member.hasPermission('ADMINISTRATOR') || (message.member.id === '248895007849709569', '355625538167242752')) {
		authorName = message.author.username;
	}
	else if(message.member.hasPermission('SEND_MESSAGES')) {
		authorName = message.author;
	}*/
	if (message.author.bot) {return;}
	else if (message.member.sendMessage) {
		logChannel.send('#' + message.channel.name + ': ' + message.author.username + ' - ' + message.cleanContent);
	}
});

/* Self bot
client.on('message', message => {
	if (message.author.bot) {return;}
	else if(message.channel.id === '538214047695503371') {
		client.channels.get('539630954671505419').send(message.content);
	}
});
*/
// Main commands
client.on('message', message => {
	console.log(message.guild.name + ' / #' + message.channel.name + ': ' + message.author.username + ' - ' + message.content);
	if (message.content === '!!server-info') {
		message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated at: ${message.guild.createdAt}`);
	}
	else if (message.content === '!!test1') {
		message.channel.send();
	}
	else if (message.content === '!!ping-of-death') {
		message.channel.send('!!ping-of-death');
		message.channel.send('<@314522972377579520>')
  }
  else if (message.content === '!!website') {
    message.channel.send(' I should be online! To be sure of this, check out this website. https://DaDutchBot--dadutchman.repl.co')
  }
  else if (message.content === 'ban hammer') {
    message.channel.send('https://imgur.com/gallery/O3DHIA5')
  }
});

/* other bot
.
.
.
.
.
.
.
.
.
.
*/

client.on('ready', () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	client.user.setActivity(`Serving ${client.users.size} users`);
});

// new server joined
client.on('guildCreate', guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

// server removed
client.on('guildDelete', guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on('message', async message => {
	if(message.author.bot) return;

	if(message.content === '!!ping') {
		const m = await message.channel.send('Ping?');
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
});


client.login(token);
