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
    if (rowIndex > diagram.length)
        return {
            splitCount: 0,
            diagram: diagram,
        };
}
