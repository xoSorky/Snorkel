import { getScoreboardData } from '../utils/scoreboard-data.ts';
import { bot } from "../snorkel.ts";
import { sleep } from '../utils/utils.ts'

export async function joinPit() {
    let [lobby, level, gold] = getScoreboardData()
    if (!(lobby.startsWith("M"))) {
        bot.chat('/play pit');
        console.log('snorkel joined pit!');
        await sleep(5000);
    }
}