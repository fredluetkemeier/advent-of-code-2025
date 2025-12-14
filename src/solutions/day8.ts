export function dayEight(input: string): [number, number] {
    const boxes = parseInput(input);

    return [partOne(boxes), 0];
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

// PART 1

function partOne(boxes: Box[]): number {
    findClosestBoxes(boxes);

    return 0;
}

function findClosestBoxes(availableBoxes: Box[]) {
    const temp = availableBoxes.reduce<[Box, Box][]>(
        (accA, boxA) => [
            ...accA,
            ...availableBoxes.reduce<[Box, Box][]>(
                (accB, boxB) => [...accB, [boxA, boxB]],
                []
            ),
        ],
        []
    );

    console.log(temp);

    const sortedBoxes = availableBoxes.sort(
        (a, b) =>
            Math.pow(a.x - b.x, 2) +
            Math.pow(a.y - b.y, 2) +
            Math.pow(a.z - b.z, 2)
    );

    console.log(sortedBoxes);

    return [];
}
