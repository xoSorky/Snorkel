import { Vec3 } from "vec3";

function getDaysIntoYear(date: Date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()) - Date.UTC(date.getFullYear(), 0, 1)) / 24 / 60 / 60 / 1000;
}

export function getCurrentMapValues() {
    // Jan 1, 2025 was a Wednesday - 0 days into the year, and was kings map
    let currentDate = new Date() // defaults to UTC
    let daysIntoYear = getDaysIntoYear(currentDate) // 0 - 364
    let numDaysFromFirstTuesday = 1 // How many days is Jan 1 from the previous Tuesday?
    let numWeeksSinceFirstTuesday = Math.floor((daysIntoYear + numDaysFromFirstTuesday) / 7)
    let indexOfFirstMap = 1 // offset by 1 since castle was the map on Jan 1, 2025
    let index = numWeeksSinceFirstTuesday + indexOfFirstMap // add 1 since four seasons is the next map to rotate in
    let mapValuesArray = [
        {
            MAP: "elements",
            MID_RADIUS: 16,
            RINGED_MID_RADIUS: 7,
            SPAWN_Y_CUTOFF: 110,
            SPAWN_RADIUS: 9,
            SPAWN_Y: 114,
            KILL_DISTANCE_CUTOFF: 18,
            OBSIDIAN_X_LIMIT: 11,
            OBSIDIAN_Z_LIMIT: 11,
            OBSIDIAN_Y_LOWER: 82,
            OBSIDIAN_Y_UPPER: 86,
            ENDERCHEST_POS: [-12.5, 114.5, 7.5],
            SPAWN_POINTS: []
        },
        {
            MAP: "castle",
            MID_RADIUS: 17,
            RINGED_MID_RADIUS: 7,
            SPAWN_Y_CUTOFF: 90,
            SPAWN_RADIUS: 10,
            SPAWN_Y: 95,
            KILL_DISTANCE_CUTOFF: 15,
            OBSIDIAN_X_LIMIT: 15,
            OBSIDIAN_Z_LIMIT: 15,
            OBSIDIAN_Y_LOWER: 71, 
            OBSIDIAN_Y_UPPER: 76,
            SPAWN_POINTS: []
        },
        {
            MAP: "corals",
            MID_RADIUS: 17,
            RINGED_MID_RADIUS: 7,
            SPAWN_Y_CUTOFF: 110,
            SPAWN_RADIUS: 8,
            SPAWN_Y: 114,
            KILL_DISTANCE_CUTOFF: 20,
            OBSIDIAN_X_LIMIT: 15,
            OBSIDIAN_Z_LIMIT: 15,
            OBSIDIAN_Y_LOWER: 82, 
            OBSIDIAN_Y_UPPER: 86,
            SPAWN_POINTS: []
        },
        {
            MAP: "genesis",
            MID_RADIUS: 17,
            RINGED_MID_RADIUS: 7,
            SPAWN_Y_CUTOFF: 80,
            SPAWN_RADIUS: 11,
            SPAWN_Y: 86,
            KILL_DISTANCE_CUTOFF: 20,
            OBSIDIAN_X_LIMIT: 15,
            OBSIDIAN_Z_LIMIT: 15,
            OBSIDIAN_Y_LOWER: 43, 
            OBSIDIAN_Y_UPPER: 47,
            ENDERCHEST_POS: [-15.5, 86.5, 9.5],
            SPAWN_POINTS: []
        },
        {
            MAP: "four seasons",
            MID_RADIUS: 16,
            RINGED_MID_RADIUS: 8,
            SPAWN_Y_CUTOFF: 110,
            SPAWN_RADIUS: 10,
            SPAWN_Y: 114,
            KILL_DISTANCE_CUTOFF: 18,
            OBSIDIAN_X_LIMIT: 15,
            OBSIDIAN_Z_LIMIT: 15,
            OBSIDIAN_Y_LOWER: 82, 
            OBSIDIAN_Y_UPPER: 86,
            ENDERCHEST_POS: [-11.5, 114.5, 5.5],
            SPAWN_POINTS: []
        }
    ]
    for (var mapValues of mapValuesArray) {
        mapValues.SPAWN_POINTS = generateCirclePoints(mapValues.SPAWN_RADIUS, mapValues.SPAWN_Y, 20)
    }
    return mapValuesArray[index % mapValuesArray.length]
}

function generateCirclePoints(radius: number, yLevel: number, numPoints: number) {
    const points = [];
    const angleIncrement = 2 * Math.PI / numPoints; // angle between points in radians
    for (let i = 0; i < numPoints; i++) {
        const angle = i * angleIncrement;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        points.push(new Vec3(Math.round((x + 0.5) * 10) / 10, yLevel, Math.round((z + 0.5) * 10) / 10))
    }
    return points;
}