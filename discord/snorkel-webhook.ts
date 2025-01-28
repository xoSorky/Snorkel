import { EmbedBuilder } from '@discordjs/builders';
import { Client, Collection, Events, GatewayIntentBits, WebhookClient } from 'discord.js'
import * as dotenv from 'dotenv';
dotenv.config();
import { currentTime } from '../utils/date-handler.ts'
import { Snorkel, startTime } from "../snorkel.ts";
import { getActiveTime } from '../utils/date-handler.ts'

export function webhookLogin(host) {
    if (process.env.SNORKEL_WEBHOOK === undefined) {
        console.error(`No Snorkel Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has Logged in to ${host}!`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).then(() => {
        console.log('Snorkel logged in!');
    }).catch(console.error)
}

export function webhookKicked(reason, wasConnected) {
    if (process.env.SNORKEL_WEBHOOK === undefined) {
        console.error(`No Snorkel Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkle has been kicked! reason: ${reason}. Was connected: ${wasConnected}`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}

export function webhookGainedXP(xpValue: number, sessionXP: number) {
    if (process.env.SNORKEL_WEBHOOK === undefined) {
        console.error(`No Snorkel Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has gained ${xpValue} participation XP. Total XP gained this session: ${sessionXP}`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}

export function webhookJoinedPit() {
    if (process.env.SNORKEL_WEBHOOK === undefined) {
        console.error(`No Snorkel Channel Webhook. Please add one in the environment variables! (.env/SNORKEL_WEBHOOK)`)
        return;
    }
    const webhook = new WebhookClient({ url: process.env.SNORKEL_WEBHOOK });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has logged into pit!`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: `Runtime: ${getActiveTime()} * Today at ${currentTime()}`})
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}