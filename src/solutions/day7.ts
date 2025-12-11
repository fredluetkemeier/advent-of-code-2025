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

    const currentRowSplitterIndices = getSplitterIndicesInRow(currentRow);

    const previousRow = diagram[rowIndex - 1]!;
    const newRow = currentRow.map((x, index) => {
        const spaceAbove = previousRow.at(index)!;

        if (spaceAbove === "S") {
            return "|";
        }
    });

    return {
        splitCount: 0,
        diagram: diagram,
    };
}

function getSplitterIndicesInRow(row: string[]): number[] {
    return row.reduce<number[]>(
        (acc, item, index) => (item === "^" ? [...acc, index] : acc),
        []
    );
}
