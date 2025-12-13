import { parentPort, workerData, Worker } from "node:worker_threads";

export function daySeven(input: string): [string, string] {
    const diagram = parseInput(input);

    return [partOne(diagram).toString(), partTwo(diagram).toString()];
}

type Diagram = string[][];

function parseInput(input: string): Diagram {
    return input.split("\n").map((x) => x.split(""));
}

// PART 1

function partOne(diagram: Diagram): number {
    const result = projectTachyonBeam(diagram);

    return result.splitCount;
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

            if (array[index + 1] === "^" && previousRow[index + 1] === "|")
                return {
                    splitCount: acc.splitCount + 1,
                    row: [...acc.row, "|"],
                };

            if (array[index - 1] === "^" && previousRow[index - 1] === "|")
                return {
                    splitCount: acc.splitCount,
                    row: [...acc.row, "|"],
                };

            if (item === ".")
                return {
                    splitCount: acc.splitCount,
                    row: [...acc.row, itemAbove === "|" ? "|" : "."],
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

    const next = projectTachyonBeam(
        [...diagram.slice(0, rowIndex), newRow, ...diagram.slice(rowIndex + 1)],
        rowIndex + 1
    );

    return {
        splitCount: splitCount + next.splitCount,
        diagram: next.diagram,
    };
}

// PART 2

function partTwo(diagram: Diagram): number {
    const completedDiagram = projectTachyonBeam(diagram);

    return countTachyonTimelines(completedDiagram.diagram);
}

function countTachyonTimelines(diagram: Diagram): number {
    const startIndex = diagram[0]!.indexOf("S");
    return getTimelineCount(diagram, startIndex);
}

function getTimelineCount(diagram: Diagram, startColIndex: number): number {
    const cache = new Map<string, number>();

    function helper(rowIndex: number, colIndex: number): number {
        if (rowIndex > diagram.length - 1) return 1;

        const cacheKey = `${rowIndex},${colIndex}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey)!;

        const item = diagram[rowIndex]![colIndex];

        const result =
            item === "^"
                ? helper(rowIndex + 1, colIndex - 1) +
                  helper(rowIndex + 1, colIndex + 1)
                : helper(rowIndex + 1, colIndex);

        cache.set(cacheKey, result);

        return result;
    }

    return helper(0, startColIndex);
}
