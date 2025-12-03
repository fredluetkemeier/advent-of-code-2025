import { Command } from "commander";

const program = new Command();

program
    .name("advent-of-code-2025")
    .argument("<day>")
    .action((day) => {
        console.log(day);
    });

program.parse();
