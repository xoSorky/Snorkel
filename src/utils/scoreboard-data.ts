import { bot } from "../snorkel.js";

export function getScoreboardData() {
    const items = bot.scoreboard?.sidebar?.items;
    const lobbyID = items?.find((x) => x.displayName.toString().includes("/"));
    const botLevel = items?.find((x) => x.displayName.toString().includes("["));
    const botGold = items?.find((x) => x.displayName.toString().includes("g"));
    try {
        const lobbyText = lobbyID?.displayName.toString().replace(/[^\x00-\x7F]/g, "");
        const levelText = botLevel?.displayName.toString().replace(/[^\x00-\x7F]/g, "");
        const goldText = botGold?.displayName.toString().replace(/[^\x00-\x7F]/g, "");
        const lobby = lobbyText?.split("  ")?.[1];
        const level = levelText?.split(": ")?.[1]?.match(/\[(\d+)\]/)?.[1];
        const gold = goldText?.split(": ")?.[1]?.replace(/,/g, "")?.match(/(\d+.*)g/)?.[1];
        return [lobby || "unknown", level || "unknown", gold || 0];
    } catch (error) {
        console.error(error);
        console.log(
            lobbyID?.displayName.toString(),
            botLevel?.displayName.toString(),
            botGold?.displayName.toString()
        );
        return ["-1", "-1", "-1"];
    }
}
