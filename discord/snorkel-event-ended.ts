import { EmbedBuilder } from '@discordjs/builders';
import { Client, Collection, Events, GatewayIntentBits, WebhookClient } from 'discord.js'
import * as dotenv from 'dotenv';
dotenv.config();
import { Snorkel, startTime } from "../snorkel.ts";
import { currentTime } from '../utils/date-handler.ts'
import { getActiveTime } from '../utils/date-handler.ts'