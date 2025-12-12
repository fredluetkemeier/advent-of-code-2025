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
    const beamTree = convertDiagramToTree(completedDiagram.diagram);

    return 0;
}

type Tree = {
    isLeaf: boolean;
    children: Tree[];
};

function convertDiagramToTree(diagram: Diagram): Tree {
    return {
        isLeaf: false,
        children: [],
    };
}
