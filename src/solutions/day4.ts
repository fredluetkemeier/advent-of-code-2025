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
    return countAccessibleGridSlots(grid);
}

function countAccessibleGridSlots(grid: Grid, rowIndex: number = 0): number {
    const row = grid[rowIndex];

    if (!row) return 0;

    const RADIUS = 1;
    const maxX = row.length - 1;
    const maxY = grid.length - 1;

    const count = row.reduce((acc, slot, columnIndex) => {
        if (slot === ".") return acc;

        const count = getPoints(columnIndex, rowIndex, RADIUS)
            .filter(([x, y]) => x >= 0 && y >= 0 && x <= maxX && y <= maxY)
            .reduce((acc, [x, y]) => acc + (grid[y]![x] === "@" ? 1 : 0), 0);

        return count < 4 ? acc + 1 : acc;
    }, 0);

    return count + countAccessibleGridSlots(grid, rowIndex + 1);
}

type Point = [number, number];

function getPoints(
    columnIndex: number,
    rowIndex: number,
    radius: number
): Point[] {
    const xIndices = getIndices(columnIndex, radius);
    const yIndices = getIndices(rowIndex, radius);

    return xIndices
        .reduce<Point[]>(
            (xAcc, xIndex) => [
                ...xAcc,
                ...yIndices.reduce<Point[]>(
                    (yAcc, yIndex) => [...yAcc, [xIndex, yIndex]],
                    []
                ),
            ],
            []
        )
        .filter(([x, y]) => !(x === columnIndex && y === rowIndex));
}

function getIndices(startIndex: number, radius: number): number[] {
    return [...Array(3)].map((_, index) => startIndex - radius + index);
}
