export function daySix(input: string): [string, string] {
    const partOneInput = parsePartOneInput(input);
    const partTwoInput = parsePartTwoInput(input);

    return [
        partOne(partOneInput.numbers, partOneInput.operators).toString(),
        partTwo(partTwoInput.numbers, partTwoInput.operators).toString(),
    ];
}

function parsePartOneInput(input: string): {
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

function parsePartTwoInput(input: string): {
    numbers: string[][];
    operators: string[];
} {
    const allRows = input.trim().split("\n");
    const operatorIndices = allRows[allRows.length - 1]!.split("")
        .map((x, index) => (x === "*" || x === "+" ? index : null))
        .filter((x) => x !== null);

    return {
        numbers: allRows.slice(0, -1).map((row) =>
            row
                .split("")
                .map((char, index) =>
                    char === " " &&
                    !operatorIndices
                        .map((operatorIndex) => operatorIndex - 1)
                        .includes(index)
                        ? "0"
                        : char
                )
                .join("")
                .split(" ")
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

// PART 2

function partTwo(grid: string[][], operators: string[]): number {
    return invertGrid(grid).reduce(
        (acc, row, index) => acc + doCephalopodMath(row, operators[index]!),
        0
    );
}

function doCephalopodMath(row: string[], operator: string) {
    // console.log("OPERATOR", operator);

    const res = invertGrid(row.map((x) => String(x).split("").reverse()))
        .map((x) => Number(x.filter((digit) => digit !== "0").join("")))
        .map((x) => {
            if (x === 0) console.log(row, operator);

            return x;
        })
        .reduce((acc, x) => (operator === "+" ? acc + x : (acc || 1) * x), 0);

    return res;
}

// SHARE

function invertGrid<T>(grid: T[][]): T[][] {
    return grid.reduce<T[][]>(
        (yAcc, row) =>
            row.reduce<T[][]>((xAcc, item, xIndex) => {
                const accRow = yAcc[xIndex];

                return accRow
                    ? [...xAcc, [...accRow, item]]
                    : [...xAcc, [item]];
            }, []),
        []
    );
}
