const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');

const client = new Discord.Client();
const dotenv = require('dotenv').config();

const token = process.env.DISCORD_BOT_SECRET;

// db
const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './mydb.sqlite3';
const DB = new sqlite3.Database(DB_PATH, function(err){
    if (err) {
        console.log(err)
        return
    }
    console.log('Connected to ' + DB_PATH + ' database.')
});
DB.close();

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_PATH
});

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});


client.on('ready', () => {
  console.log("I'm in!");
  console.log(client.user.username);
});

client.on('message', msg => {
    if (msg.author.id != client.user.id) {
        msg.channel.send(msg.content.split('').reverse().join(''));
    }
});

client.login(token);