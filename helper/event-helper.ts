import { bot } from "../snorkel.ts";
import { sleep } from "../utils/utils.ts";
import { webhookQuickMaths } from "../discord/snorkel-event-webhook.ts";

async function quickMaths(message: string) {
    const startTime = Date.now();
    const mathProblem = message.replace('QUICK MATHS! Solve: ', '').replace('x', '*');
    const result = Math.floor(this.evalMath(mathProblem));
    console.log(`QUICK MATHS! I think the answer is ${result}!`)
    webhookQuickMaths(`QUICK MATHS! I think the answer is ${result}!`)
    let randWait = Math.random() + 1;
    await sleep(randWait);
    bot.chat(result.toString());
}

function evalMath(expression: string): number {
    return new Function(`return (${expression});`)();
}
