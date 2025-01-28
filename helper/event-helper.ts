import { bot } from "../snorkel.ts";
import { sleep } from "../utils/utils.ts";
import { webhookMinorEvent, webhookQuickMaths } from "../discord/snorkel-event-webhook.ts";
import { parse } from "dotenv";

export async function quickMaths(message: string) {
    const mathProblem = message.replace('QUICK MATHS! Solve: ', '').replace('x', '*');
    const result = Math.floor(solveMathProblem(mathProblem));
    console.log(`QUICK MATHS! I think the answer is ${result}!`)
    webhookQuickMaths(`QUICK MATHS! I think the answer is ${result}!`)
    let randWait = Math.random() + 1;
    await sleep(randWait);
    bot.chat(result.toString());
}

function solveMathProblem(problem: string): number {
    try {
        const parsedProblem = problem.replace(/[^0-9+\-*/().]/g, '');
        return eval(parsedProblem);
    } catch (error) {
        console.error(`Error solving math problem: ${problem}`);
        return NaN; // Return NaN if there's an error
    }
}
