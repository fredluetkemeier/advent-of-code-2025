export function dayEight(input: string): [number, number] {
    const boxes = parseInput(input);

    return [partOne(boxes), 0];
}

// PART 1

function partOne(boxes: Box[]): number {
    return 0;
}

type Box = {
    x: number;
    y: number;
    z: number;
};

function parseInput(input: string): Box[] {
    return input.split("\n").map((row) => {
        const [x, y, z] = row.split(",");
        return { x: Number(x!), y: Number(y!), z: Number(z!) };
    });
}
