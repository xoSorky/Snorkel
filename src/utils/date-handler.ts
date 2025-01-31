import { Snorkel, startTime } from "../snorkel.js";

export function currentTime() {
    const date = new Date();
    const estTime = new Date(date.getTime());
    return estTime;
}

export function getActiveTime() {
    let currentTime = Date.now();
    let runningTime = currentTime - startTime;
    const totalSeconds = Math.floor(runningTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const remainingSeconds = totalSeconds % 60;
    const formattedHours = totalHours.toString().padStart(2, '0');
    const formattedMinutes = remainingMinutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function getStartTime() {
    let startTime = Date.now()
    return startTime;
}