import mineflayer from 'mineflayer';
import * as dotenv from 'dotenv';
dotenv.config();
import { colorMap, colorizeMessage } from './utils/chalk-config.ts';
import { sleep } from './utils/utils.ts';
import { webhookLogin, webhookKicked, webhookGainedXP, webhookJoinedPit } from './discord/snorkel-webhook.ts';
import { webhookMajorEvent, webhookMinorEvent, webhookQuickMaths } from './discord/snorkel-event-webhook.ts';
import { webhookMentioned } from './discord/snorkel-mentions.ts';
import { processXP, updateSessionXP } from './utils/session.ts';
import { quickMaths } from './helper/event-helper.ts';
import { getScoreboardData } from './utils/scoreboard-data.ts';
import { webhookLevelUp } from './discord/snorkel-levels.ts';

const botArgs = {
    host: 'hypixel.net',
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
    reconnecting: boolean;
    rejoiningPit: boolean;
    constructor() {
        this.host = botArgs.host;
        this.port = botArgs.port;
        this.version = botArgs.version;
        this.email = process.env.SNORKEL_EMAIL;
        this.password = process.env.SNORKEL_PASSWORD;
        this.username = this.username;
        this.reconnecting = false;
        this.rejoiningPit = false;
    }

    async initBot() {
        if (!this.email || !this.password) {
            console.error(`No Email or Password. Please set the Environment Variables: "SNORKEL_EMAIL" & "SNORKEL_PASSWORD" in the .env file.`);
            return;
        }

        try {
            console.log('Initializing bot...');
            this.bot = mineflayer.createBot({
                username: this.username,
                host: this.host,
                port: parseInt(this.port),
                version: this.version,
                auth: 'microsoft',
            });

            this.bot.physicsEnabled = true;
            await this.initEvents();
        } catch (err) {
            console.error('Error during bot initialization:', err);
            this.retryConnection();
        }
    }

    async rejoinPit() {
        if (this.rejoiningPit) return;
        this.rejoiningPit = true;
        this.bot.chat('/play pit');
        console.log('snorkel joined pit!');
        await sleep(5000);
        this.rejoiningPit = false;
    }

    async initEvents() {
        this.bot.on('login', async () => {
            webhookLogin(this.host);
            await sleep(5000);
            this.reconnecting = false;
        });

        this.bot.on('kicked', async (reason: string, loggedIn: boolean) => {
            webhookKicked(reason, loggedIn);
            await sleep(10000);
            this.retryConnection();
        });

        this.bot.on('message', async (msg: string) => {
            const msg2: string = msg.toString();
            console.log(msg2);

            if (msg2.includes(this.bot.username.toString().toLowerCase())) {
                webhookMentioned(msg2)
            }
            if (msg2.startsWith("FREE XP! for participation ")) {
                let contents = msg2.split("+");
                let a = contents[1]
                let b = a.split("XP")
                let xpValue = Number(b[0]);
                updateSessionXP(xpValue);
                await sleep(1000);
                processXP(xpValue)
            }
            if (msg2.startsWith("QUICK MATHS! Solve: ")) {
                quickMaths(msg2);
            }
            if (msg2.includes("SnorkelOpps".toLowerCase()) && msg2.startsWith("QUICK MATHS!")) {
                webhookQuickMaths(msg2);
            }
            if (msg2.includes("MINOR EVENT!")) {
                webhookMinorEvent(msg2);
            }
            if (msg2.includes("PIT EVENT ENDED:") || msg2.includes("MAJOR EVENT!")) {
                webhookMajorEvent(msg2);
                await sleep(1000)
                this.bot.chat("gg")
            }
            if (msg2.includes("PIT LEVEL UP!")) {
                webhookLevelUp(msg2)
            }
        });
        this.bot.on('physicsTick', async () => {
            let [lobby, level, gold] = getScoreboardData()
            if (!(lobby.startsWith("M"))) {
                await this.rejoinPit();
            }
        })
    }

    retryConnection() {
        if (this.reconnecting) return;

        this.reconnecting = true;
        console.log('Reconnecting in 10 seconds...');
        setTimeout(() => {
            this.initBot().catch((err) => {
                console.error('Failed to reconnect:', err);
                this.reconnecting = false;
                this.retryConnection();
            });
        }, 10000);
    }
}

const snorkel = new Snorkel();
snorkel.initBot();

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

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

// QUICK MATHS! First 5 players to answer gain +250XP +500g
// QUICK MATHS! Solve: 14x11
// QUICK MATHS! #1 [63] Monecika answered in 3.65s
// QUICK MATHS! #2 [77] Joontis answered in 4s
// QUICK MATHS! #3 [64] samwy781 answered in 4.15s
// QUICK MATHS! #4 [82] PiyanistMC answered in 5.05s
// QUICK MATHS! #5 [82] LowTierFour answered in 5.55s
// QUICK MATHS OVER! 14x11 = 154

// MINOR EVENT! KOTL in Sky Area ende