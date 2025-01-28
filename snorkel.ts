import mineflayer from 'mineflayer';
import * as dotenv from 'dotenv';
dotenv.config();
import { Authflow } from 'prismarine-auth';
import { colorMap, colorizeMessage } from './utils/chalk-config.ts';
import { joinPit } from './utils/join-pit.ts'
import { sleep } from './utils/utils.ts'
import { webhookLogin, webhookKicked, webhookGainedXP, webhookJoinedPit } from './discord/snorkel-webhook.ts';
import {  } from './discord/snorkel-event-ended.ts'
import { webhookLevelUp } from './discord/snorkel-levels.ts'
import { webhookMentioned } from './discord/snorkel-mentions.ts'
import { processXP, updateSessionXP } from './utils/session.ts'

const botArgs = {
    host: 'ilovecatgirls.xyz',
    port: '25565',
    version: '1.8.9'
}

export class Snorkel {
    bot: any;
    host: string;
    port: string;
    version: string;
    email: string | undefined;
    password: string | undefined;
    username: string;
    constructor() {
        this.host = botArgs.host;
        this.port = botArgs.port;
        this.version = botArgs.version;
        this.email = process.env.SNORKEL_EMAIL;
        this.password = process.env.SNORKEL_PASSWORD;
        this.username = this.username;
    }

    async initBot() {
        if (!this.email || !this.password) {
            console.error(`No Email or Password. Please set the Environment Variables: "SNORKEL_EMAIL" & "SNORKEL_PASSWORD in the .env file.`)
            return;
        }
        this.bot = mineflayer.createBot({
            username: this.username,
            host: this.host,
            port: parseInt(this.port),
            version: this.version,
            auth: 'microsoft',
        });
        this.bot.physicsEnabled = true;
        await this.initEvents();
    }

    async initEvents() {
        this.bot.on('login', async () => {
            console.log(`Snorkel Logged in to ${this.host}!`);
            webhookLogin(this.host);
            await sleep(5000)
            await joinPit();
            webhookJoinedPit();
        });

        this.bot.on('kicked', async (reason, loggedIn) => {
            webhookKicked(reason, loggedIn);
            await sleep(10000)

        });

        this.bot.on('message', async (msg) => {
            const msg2: string = msg.toString();
            console.log(msg2);

            if (msg2.includes("Snorkel")) {
                webhookMentioned(msg2)
            }
            if (msg2.startsWith("FREE XP! for participation ")) {
                let contents = msg2.split("+");
                let a = contents[1]
                let b = a.split("XP")
                let xpValue = b[0];
                updateSessionXP(xpValue);
                await sleep(1000);
                processXP(xpValue)
            }
        });
    }
}


const snorkel = new Snorkel();
snorkel.initBot();
export const startTime = Date.now()
export const bot = snorkel.bot;

// messages to check

// FREE XP! for participation +13XP

// ----------------------
// PIT EVENT ENDED: ROBBERY [INFO]
// Your rewards: +50g
// Bonus for all: MISSED! need to be there at the beginning of the event
// You: 50g (ranked #27)
// Top players:
//   #1 [88] Darkaid_ITA with 3136g
//   #2 [92] Lion_134 with 1511g
//   #3 [83] MorpheaZ with 1107g
// ----------------------