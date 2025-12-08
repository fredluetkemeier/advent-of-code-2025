export function dayFour(input: string): [string, string] {
    const grid = parseGrid(input);

    return [partOne(grid).toString(), ""];
}

type Grid = string[][];

function parseGrid(input: string): Grid {
    return input
        .trim()
        .split("\n")
        .map((x) => x.split(""));
}

// PART 1

function partOne(grid: Grid): number {
    return 0;
}

function countAccessibleGridSlots(grid: Grid, currentRow: number = 0): number {
    const row = grid[currentRow];
}
