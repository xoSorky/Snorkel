import { EmbedBuilder } from '@discordjs/builders';
import { Client, Collection, Events, GatewayIntentBits, WebhookClient } from 'discord.js'
import * as dotenv from 'dotenv';
dotenv.config();

export function webhookLogin(host) {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has Logged in to ${host}!`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
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
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkle has been kicked! reason: ${reason}. Was connected: ${wasConnected}`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}

export function webhookMentioned(message) {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `${message}`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}

export function webhookJoinedPit() {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has logged into pit!`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}

export function webhookGainedXP(xpValue) {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('   Snorkel Bot by Sorky')
    .addFields({ name: 'Snorkel AFK', value: `Snorkel has gained ${xpValue} participation XP. Total XP gained this session: <insert>`})
    //.setDescription('Snorkle has Logged in!')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0x14d8f3);

    webhook.send({
        content: undefined,
        embeds: [embed],
    }).catch(console.error)
}



export function webhookExample() {
    const webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/1333651958841479261/OeSsCWIdpvZPt6IBpTkP5tDttC7_Arh6UC4MMAnnIgEsMxzqomSJ223-FXLif0Ny_weJ' });
    const embed = new EmbedBuilder()
    .setTitle('AFK Bot by Sorky')
    .setDescription('Snorkel AFK')
    .setFooter({ text: 'Runtime: <insert runtime> * Today at <time>' })
    .setThumbnail('https://imgur.com/a/fK4P0yo')
    .setColor(0xff0000);

    webhook.send({
        content: undefined,
        embeds: [embed]
    }).then(() => {
        console.log('Webhook Sent Successfully!');
    }).catch(console.error);
}
