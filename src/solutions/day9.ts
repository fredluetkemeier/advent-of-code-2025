export function dayNine(input: string): [number, number] {
    const points = parseInput(input);

    return [partOne(points), partTwo(points)];
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

// PART 2

function partTwo(points: Point[]): number {
    const pointsWithinBounds = findLargestAreaWithinBounds(points);

    return 0;
}

function findLargestAreaWithinBounds(points: Point[]): number {
    const bounds = makeBounds(points);
    const areaSet = new Set<number>();

    // console.log(bounds);

    for (const pointA of points) {
        for (const pointB of points) {
            if (pointA.x === pointB.x && pointA.y === pointB.y) continue;

            const isWithinBounds = isRectangleWithinBounds(
                [pointA, pointB],
                bounds
            );

            const area =
                (Math.abs(pointA.x - pointB.x) + 1) *
                (Math.abs(pointA.y - pointB.y) + 1);

            areaSet.add(area);
        }
    }

    return [...areaSet].sort((a, b) => b - a)[0]!;
}

function makeBounds(points: Point[], index: number = 0): [Point, Point][] {
    if (index === points.length - 1) {
        return [[points[points.length - 1]!, points[0]!]];
    }

    return [
        [points[index]!, points[index + 1]!],
        ...makeBounds(points, index + 1),
    ];
}

function isRectangleWithinBounds(
    rectangle: [Point, Point],
    bounds: [Point, Point][]
): boolean {
    const [pointA, pointB] = rectangle;
    const extrapolatedPoints = [
        { x: pointA.x, y: pointB.y },
        { x: pointB.x, y: pointA.y },
    ];

    if (pointA.x === 2 && pointA.y === 3 && pointB.x === 11 && pointB.y === 1) {
        const closestVerticalBounds = findClosestBounds(
            extrapolatedPoints[0]!,
            bounds,
            "vertical"
        );
        const closestHorizontalBounds = findClosestBounds(
            extrapolatedPoints[0]!,
            bounds,
            "horizontal"
        );

        console.log(extrapolatedPoints);
        console.log(closestVerticalBounds, closestHorizontalBounds);
    }

    // console.log(extrapolatedPoints[0], closestVerticalBounds);

    // return extrapolatedPoints.every(point => bounds.every(boundPoint => point.x < boundPoint.x || point.y <))

    return false;
}

function findClosestBounds(
    point: Point,
    bounds: [Point, Point][],
    direction: "vertical" | "horizontal"
): [[Point, Point], [Point, Point]] {
    const axis = direction === "vertical" ? "x" : "y";

    const [boundA, boundB] = bounds
        .filter(([a, b]) => a[axis] === b[axis])
        .sort(([a], [b]) => {
            return (
                Math.abs(a[axis] - point[axis]) -
                Math.abs(b[axis] - point[axis])
            );
        });

    return [boundA!, boundB!];
}
