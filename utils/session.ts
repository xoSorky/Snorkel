import { webhookGainedXP } from "../discord/snorkel-webhook.ts";


export let sessionXP = 0;

export function processXP(xp: number) {
    webhookGainedXP(xp, getSessionXP());
}

export function updateSessionXP(xp: number) {
    sessionXP += xp;
}

export function getSessionXP() {
    return sessionXP;
}