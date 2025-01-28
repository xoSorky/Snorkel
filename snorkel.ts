import mineflayer from 'mineflayer';
import * as dotenv from 'dotenv';
dotenv.config();
import { Authflow } from 'prismarine-auth';
import { colorMap, colorizeMessage } from './utils/chalk-config.ts';
import { webhookGainedXP, webhookJoinedPit, webhookKicked, webhookLogin, webhookMentioned } from './discord/discord-bot.ts';
import { joinPit } from './utils/join-pit.ts'
import { sleep } from './utils/utils.ts'

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
        this.initEvents();
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
            if (msg2.includes("FREE XP! for participation ")) {
                let contents = msg2.split("+");
                let aaa = contents[1]
                let bbb = aaa.split("XP")
                let xpValue = bbb[0];
                webhookGainedXP(xpValue)
            }
        });
    }
}

const snorkel = new Snorkel();
snorkel.initBot();
export const bot = snorkel.bot;




// messages to check
// FREE XP! for participation +13XP