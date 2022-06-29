const { Plugin } = require('powercord/entities');

//! Information to reach the API
const key = 'effbbb22b12e4952864db924c4e017db';
const endpoint = 'https://api.rebrandly.com/v1/links';

module.exports = class ShortenUrls extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'su',
            description: 'Sends a short url of yours',
            usage: '{c} [ ...url ]',
            executor: (args) => ({
                send: true,
                result: this.shorten(args)
            })
        })
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('short');
    }

    async shorten(args) {
        const options = {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', apikey: key},
            body: JSON.stringify({ destination: args.join('') })
        }

        const response = await fetch(endpoint, options);
        const json = await response.json();
        console.log(json.shortUrl);
        return `https://${json.shortUrl}`;
    }
}