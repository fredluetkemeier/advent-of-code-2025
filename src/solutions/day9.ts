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
    const largestArea = findLargestAreaWithinBounds(points);

    console.log(largestArea);

    return 0;
}

function findLargestAreaWithinBounds(points: Point[]): number {
    const bounds = makeBounds(points);
    const areaSet = new Set<number>();

    const tempMap = new Map<string, number>();

    for (const pointA of points) {
        for (const pointB of points) {
            if (pointA.x === pointB.x && pointA.y === pointB.y) continue;

            const isWithinBounds = isRectangleWithinBounds(
                [pointA, pointB],
                bounds
            );

            // console.log([pointA, pointB], isWithinBounds);

            if (!isWithinBounds) continue;

            // console.log(pointA, pointB);

            const area =
                (Math.abs(pointA.x - pointB.x) + 1) *
                (Math.abs(pointA.y - pointB.y) + 1);

            areaSet.add(area);
            tempMap.set(
                `${pointA.x},${pointA.y}-${pointB.x},${pointB.y}`,
                area
            );
        }
    }

    console.log(tempMap);

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
    const boundXMap = makeBoundXMap(bounds);

    if (pointA.x === 7 && pointA.y === 1 && pointB.x === 11 && pointB.y === 7) {
        return extrapolatedPoints.every((point) => {
            // console.log("point", point);

            const intersectingBounds = bounds.filter(([pointA, pointB]) => {
                if (pointA.x === pointB.x) return false;

                if (
                    (point.x === pointA.x && point.y === pointA.y) ||
                    (point.x === pointB.x && point.y === pointB.y)
                )
                    return true;

                const [lesserPoint, greaterPoint] = [pointA, pointB].sort(
                    (a, b) => a.x - b.x
                );

                // console.log({ lesserPoint, greaterPoint });

                const boundsAtX = boundXMap.get(point.x)!;
                const verticalBound = boundsAtX.find(
                    (boundAtX) =>
                        boundAtX[0].x === point.x &&
                        boundAtX[1].x === point.x &&
                        (boundAtX[0].x === lesserPoint!.x ||
                            boundAtX[0].x === greaterPoint!.x)
                );
                // console.log("verticalBound", verticalBound);
                const complementaryBound = verticalBound
                    ? boundsAtX.find((boundAtX) => {
                          const sortedPoints = boundAtX.sort(
                              (a, b) => a.x - b.x
                          );

                          const touchesVerticalBound = boundAtX.some(
                              (x) => x.x === verticalBound![0].x
                          );
                          const isNotAboveOriginalBound =
                              lesserPoint!.x === sortedPoints[1].x ||
                              greaterPoint!.x === sortedPoints[0].x;
                          const isVertical = boundAtX[0].x === boundAtX[1].x;

                          return (
                              touchesVerticalBound &&
                              isNotAboveOriginalBound &&
                              !isVertical
                          );
                      })
                    : undefined;
                // console.log("complementaryBound", complementaryBound);

                const isHigherBoundAtVerticalIntersection =
                    Boolean(complementaryBound) &&
                    lesserPoint!.y < complementaryBound![0].y;

                const isIntersecting =
                    point.x >= lesserPoint!.x &&
                    point.x <= greaterPoint!.x &&
                    point.y > lesserPoint!.y &&
                    (Boolean(complementaryBound)
                        ? isHigherBoundAtVerticalIntersection
                        : true);

                // console.log();

                return isIntersecting;
            });

            // console.log(intersectingBounds);

            // console.log(JSON.stringify(intersectingBounds, null, 2));

            // console.log(intersectingBounds.length);

            return (
                intersectingBounds.length !== 0 &&
                intersectingBounds.length % 2 !== 0
            );
        });
    }

    return false;
}

function makeBoundXMap(
    bounds: [Point, Point][]
): Map<number, [Point, Point][]> {
    const map = new Map<number, [Point, Point][]>();

    for (const bound of bounds) {
        bound.forEach((point) =>
            map.set(point.x, [...(map.get(point.x) ?? []), bound])
        );
    }

    return map;
}

// function consolidateBounds(bounds: [Point, Point][]): [Point, Point][] {
//     const xMap = new Map<number, [Point, Point][]>();

//     for (const bound of bounds) {
//         bound.forEach((point) =>
//             xMap.set(point.x, [...(xMap.get(point.x) ?? []), bound])
//         );
//     }

//     return bounds.reduce<[Point, Point][]>((acc, bound) => {
//         const temp = bound.map((boundPoint) => {
//             const boundsAtX = xMap.get(boundPoint.x)!;

//             const firstBound = boundsAtX.find(
//                 (boundAtX) =>
//                     boundAtX[0].x === boundPoint.x &&
//                     boundAtX[0].x !== boundAtX[1].x
//             );
//             const secondBound = boundsAtX.find(
//                 (boundAtX) =>
//                     boundAtX[1].x === boundPoint.x &&
//                     boundAtX[0].x !== boundAtX[1].x
//             );
//             const verticalBound = boundsAtX.find((boundAtX) => boundAtX);
//         });
//     }, []);
// }
