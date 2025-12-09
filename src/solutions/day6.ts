export function daySix(input: string): [string, string] {
    const { numbers, operators } = parseInput(input);

    return [partOne(numbers, operators).toString(), ""];
}

function parseInput(input: string): {
    numbers: number[][];
    operators: string[];
} {
    const allRows = input.trim().split("\n");

    return {
        numbers: allRows.slice(0, -1).map((x) =>
            x
                .trim()
                .split(" ")
                .filter((x) => x.trim())
                .map((x) => Number(x.trim()))
        ),
        operators: allRows[allRows.length - 1]!.split(" ").filter((x) =>
            x.trim()
        ),
    };
}

// PART 1

function partOne(grid: number[][], operators: string[]): number {
    return invertGrid(grid).reduce(
        (acc, row, index) =>
            acc +
            (operators[index] === "+"
                ? row.reduce((rowAcc, item) => rowAcc + item, 0)
                : row.reduce(
                      (rowAcc, item) => (rowAcc ? rowAcc * item : item),
                      0
                  )),
        0
    );
}

function invertGrid(grid: number[][]): number[][] {
    return grid.reduce<number[][]>(
        (yAcc, row) =>
            row.reduce<number[][]>((xAcc, item, xIndex) => {
                const accRow = yAcc[xIndex];

                return accRow
                    ? [...xAcc, [...accRow, item]]
                    : [...xAcc, [item]];
            }, []),
        []
    );
}
