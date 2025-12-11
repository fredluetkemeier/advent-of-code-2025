export function daySeven(input: string): [string, string] {
    const diagram = parseInput(input);

    return [partOne(diagram).toString(), ""];
}

type Diagram = string[][];

function parseInput(input: string): Diagram {
    return input.split("\n").map((x) => x.split(""));
}

// PART 1

function partOne(diagram: Diagram): number {
    const result = projectTachyonBeam(diagram);

    console.log(result.diagram, result.splitCount);

    return 0;
}

function projectTachyonBeam(
    diagram: Diagram,
    rowIndex: number = 0
): {
    splitCount: number;
    diagram: Diagram;
} {
    if (rowIndex > diagram.length - 1)
        return {
            splitCount: 0,
            diagram: diagram,
        };

    const currentRow = diagram[rowIndex]!;

    if (currentRow.some((x) => x === "S")) {
        const next = projectTachyonBeam(diagram, rowIndex + 1);

        return { splitCount: next.splitCount, diagram: next.diagram };
    }

    const previousRow = diagram[rowIndex - 1]!;

    const { splitCount, row: newRow } = currentRow.reduce<{
        splitCount: number;
        row: string[];
    }>(
        (acc, item, index, array) => {
            const itemAbove = previousRow[index]!;

            if (itemAbove === "S") {
                return {
                    splitCount: acc.splitCount,
                    row: [...acc.row, "|"],
                };
            }

            if (item === ".")
                return {
                    splitCount: acc.splitCount,
                    row: [...acc.row, itemAbove === "|" ? "|" : "."],
                };

            if (array[index + 1] === "^" && previousRow[index + 1] === "|")
                return {
                    splitCount: acc.splitCount + 1,
                    row: [...acc.row, "|"],
                };

            if (array[index - 1] === "^" && previousRow[index - 1] === "|")
                return {
                    splitCount: acc.splitCount + 1,
                    row: [...acc.row, "|"],
                };

            return {
                splitCount: acc.splitCount,
                row: [...acc.row, item],
            };
        },
        {
            splitCount: 0,
            row: [],
        }
    );

    const next = projectTachyonBeam(diagram, rowIndex + 1);

    return {
        splitCount: splitCount + next.splitCount,
        diagram: [
            ...diagram.slice(0, rowIndex),
            newRow,
            ...next.diagram.slice(rowIndex + 1),
        ],
    };
}

// function splitBeams(
//     row: string[],
//     previousRow: string[],
//     index: number = 0
// ): string[] {
//     if (row.length === 0) return [];

//     const [item, ...rest] = row.slice(index);

//     if (!item) return [];

//     if (item !== "^")
//         return [item, ...splitBeams(rest, previousRow, index + 1)];

//     const itemAbove = previousRow.at(index)!;

//     if (itemAbove === "|") {
//         return ["|", ...splitBeams(row.slice(index + ), )]
//     }
// }

// function getSplitterIndicesInRow(row: string[]): number[] {
//     return row.reduce<number[]>(
//         (acc, item, index) => (item === "^" ? [...acc, index] : acc),
//         []
//     );
// }
