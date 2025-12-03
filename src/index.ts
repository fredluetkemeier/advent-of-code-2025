import { Command } from "commander";
import { dayOne } from "./solutions/day1.js";
import fs from "fs";

const program = new Command();

program
    .name("advent-of-code-2025")
    .argument("<day>")
    .action((day) => {
        let part1 = "";
        let part2 = "";
        const inputs = readInputs(`${day}.txt`);

        switch (day) {
            case "1":
                [part1, part2] = dayOne(inputs);
        }

        console.log(`-- Day ${day} --`);
        console.log(`Part 1: ${part1}`);
        console.log(`Part 2: ${part2}`);
    });

program.parse();

function readInputs(filename: string): string[] {
    return fs
        .readFileSync(`./inputs/${filename}`, "utf-8")
        .split("\n")
        .map((x) => x.trim());
}
