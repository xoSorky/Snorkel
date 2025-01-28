import { EmbedBuilder } from '@discordjs/builders';
import { Client, Collection, Events, GatewayIntentBits, WebhookClient } from 'discord.js'
import * as dotenv from 'dotenv';
dotenv.config();
import { Snorkel, startTime } from "../snorkel.ts";
import { currentTime } from '../utils/date-handler.ts'
import { getActiveTime } from '../utils/date-handler.ts'

export function webhookLevelUp() {
    if (process.env.SNORKEL_LEVELS_WEBHOOK === undefined) {
        console.error(`No Levels Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_LEVEL_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_LEVELS_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('AFK Bot by Sorky')
    .setDescription('Snorkel AFK')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0xff0000);

    webhook.send({
        content: undefined,
        embeds: [embed]
    }).then(() => {
        console.log('Webhook Sent Successfully!');
    }).catch(console.error);
}