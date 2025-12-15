import { Command } from "commander";
import fs from "fs";
import { dayOne } from "./solutions/day1.js";
import { dayTwo } from "./solutions/day2.js";
import { dayThree } from "./solutions/day3.js";
import { dayFour } from "./solutions/day4.js";
import { dayFive } from "./solutions/day5.js";
import { daySix } from "./solutions/day6.js";
import { daySeven } from "./solutions/day7.js";
import { dayEight } from "./solutions/day8.js";
import { dayNine } from "./solutions/day9.js";

const program = new Command();

program
    .name("advent-of-code-2025")
    .argument("<day>")
    .action((day) => {
        const input = readInputFile(`${day}.txt`);

        const dayFn = getDayFn(day);
        const [part1, part2] = dayFn(input);

        console.log(`-- Day ${day} --`);
        console.log(`Part 1: ${part1}`);
        console.log(`Part 2: ${part2}`);
    });

program.parse();

function readInputFile(filename: string): string {
    return fs.readFileSync(`./inputs/${filename}`, "utf-8");
}

function getDayFn(day: string): (inputs: string) => [number, number] {
    switch (day) {
        case "1":
            return dayOne;
        case "2":
            return dayTwo;
        case "3":
            return dayThree;
        case "4":
            return dayFour;
        case "5":
            return dayFive;
        case "6":
            return daySix;
        case "7":
            return daySeven;
        case "8":
            return dayEight;
        case "9":
            return dayNine;
        default:
            return ([]) => [0, 0];
    }
}
