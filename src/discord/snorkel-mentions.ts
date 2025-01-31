import { EmbedBuilder } from '@discordjs/builders';
import { Client, Collection, Events, GatewayIntentBits, WebhookClient } from 'discord.js'
import * as dotenv from 'dotenv';
dotenv.config();
import { currentTime } from '../utils/date-handler.js'
import { Snorkel, startTime } from "../snorkel.js";
import { getActiveTime } from '../utils/date-handler.js'

export function webhookMentioned(message: string) {
    if (process.env.SNORKEL_MENTIONS_WEBHOOK === undefined) {
        console.error(`No Levels Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_MENTIONS_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_MENTIONS_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `${message}`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}