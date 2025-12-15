export function dayNine(input: string): [number, number] {
    const points = parseInput(input);

    return [partOne(points), 0];
}

type Point = {
    x: number;
    y: number;
};

function parseInput(input: string): Point[] {
    return input.split("\n").map((row) => {
        const [x, y] = row.split(",");

        return { x: Number(x!), y: Number(y!) };
    });
}

// PART 1

function partOne(points: Point[]): number {
    return findLargestArea(points);
}

function findLargestArea(points: Point[]): number {
    const areaSet = new Set<number>();

    for (const pointA of points) {
        for (const pointB of points) {
            const area =
                (Math.abs(pointA.x - pointB.x) + 1) *
                (Math.abs(pointA.y - pointB.y) + 1);

            areaSet.add(area);
        }
    }

    return [...areaSet].sort((a, b) => b - a)[0]!;
}
