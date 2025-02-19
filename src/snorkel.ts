import mineflayer from 'mineflayer';
import * as dotenv from 'dotenv';
dotenv.config();
import { sleep } from './utils/utils.js';
import { webhookLogin, webhookKicked, webhookGainedXP, webhookJoinedPit } from './discord/snorkel-webhook.js';
import { webhookMajorEvent, webhookMinorEvent, webhookQuickMaths } from './discord/snorkel-event-webhook.js';
import { webhookMentioned } from './discord/snorkel-mentions.js';
import { processXP, updateSessionXP } from './utils/session.js';
import { quickMaths } from './helper/event-helper.js';
import { getScoreboardData } from './utils/scoreboard-data.js';
import { webhookLevelUp } from './discord/snorkel-levels.js';

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
            if (this.bot) {
                if (msg2.startsWith("QUICK MATHS! Solve: ")) {
                    let randWait = ((Math.random() + 0.5)) * 1000
                    setTimeout(() => {
                        quickMaths(msg2);
                    }, randWait);
                }
                if ((msg2.toLowerCase()).includes((this.bot.username.toString()).toLowerCase())) {
                    let msg3 = msg2;
                    if (msg2.includes(`${this.bot.username}: gg`)) return;
                    else {
                        webhookMentioned(msg3)
                    }
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
                if ((msg2.toLowerCase()).includes((this.bot.username.toString()).toLowerCase()) && msg2.startsWith("QUICK MATHS!")) {
                    webhookQuickMaths(msg2);
                }
                if (msg2.startsWith("MINOR EVENT!")) {
                    webhookMinorEvent(msg2);
                }
                if (msg2.startsWith("PIT EVENT ENDED:") || msg2.includes("MAJOR EVENT!")) {
                    webhookMajorEvent(msg2);
                    await sleep(1000)
                    this.bot.chat("gg")
                }
                if (msg2.startsWith("PIT LEVEL UP!")) {
                    webhookLevelUp(msg2)
                }
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