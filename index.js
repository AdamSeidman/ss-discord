/**
 * Stupid Simple Discord Bot Creator
 * (ss-discord)
 * ======================================
 * I make a lot of Discord bots, so here is one for simple message handlers.
 */

const Discord = require('discord.js')
const { discordIntents, discordPartials } = require('poop-sock')

module.exports = {

    /**
     * Create the Discord.js bot
     * @param {*} token - Discord bot token
     * @param {function} messageHandler - (msg, isDm) => callback. If not a function, will auto-reply with handler in Discord
     * @returns Nothing
     */
    createBot: function (token, messageHandler) {
        if (token === undefined || messageHandler === undefined) return;
        const bot = new Discord.Client({ intents: discordIntents, partials: discordPartials });
        bot.login(token);
        bot.on('ready', () => {
            console.log('Bot Initialized!')
        });
        if (typeof messageHandler !== 'function') {
            const text = `${messageHandler}`;
            messageHandler = msg => {
                msg.reply(text);
            };
        }
        bot.on('messageCreate', msg => {
            if (!msg.author.bot) {
                messageHandler(msg, msg.member === null);
            }
        })
    }

};
