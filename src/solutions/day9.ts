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
    return findLargestAreaWithinBounds(points);
}

function findLargestAreaWithinBounds(points: Point[]): number {
    // const bounds = makeBounds(points);
    const areaSet = new Set<number>();

    // const tempMap = new Map<string, number>();

    for (const pointA of points) {
        for (const pointB of points) {
            if (pointA.x === pointB.x && pointA.y === pointB.y) continue;

            const isWithinBounds = isRectangleWithinBounds(
                [pointA, pointB],
                points
            );

            if (!isWithinBounds) continue;

            const area =
                (Math.abs(pointA.x - pointB.x) + 1) *
                (Math.abs(pointA.y - pointB.y) + 1);

            areaSet.add(area);
            // tempMap.set(
            //     `${pointA.x},${pointA.y}-${pointB.x},${pointB.y}`,
            //     area
            // );
        }
    }

    // console.log(tempMap);

    return [...areaSet].sort((a, b) => b - a)[0]!;
}

function isRectangleWithinBounds(
    corners: [Point, Point],
    points: Point[]
): boolean {
    const [lowerXBound, upperXBound] = corners
        .sort((a, b) => a.x - b.x)
        .map((x) => x.x);
    const [lowerYBound, upperYBound] = corners
        .sort((a, b) => a.y - b.y)
        .map((x) => x.y);

    const allCornerPoints = [
        ...corners,
        { x: corners[0].x, y: corners[1].y },
        { x: corners[1].x, y: corners[0].y },
    ];

    const isEveryPointOutsideOfRectangle = points.every((point) => {
        if (allCornerPoints.some((x) => x.x === point.x && x.y === point.y))
            return true;

        // if (
        //     allCornerPoints.every((x) => {
        //         const isEqualToPoint = x.x === point.x && x.y === point.y;
        //         const isNotOutsideOfShape = x.x

        //         return isEqualToPoint;
        //     })
        // )
        //     return true;

        const isBetweenXBounds =
            point.x >= lowerXBound! && point.x <= upperXBound!;
        const isBetweenYBounds =
            point.y >= lowerYBound! && point.y <= upperYBound!;

        return !(isBetweenXBounds && isBetweenYBounds);
    });

    return isEveryPointOutsideOfRectangle;
}

// function makeBounds(points: Point[], index: number = 0): [Point, Point][] {
//     if (index === points.length - 1) {
//         return [[points[points.length - 1]!, points[0]!]];
//     }

//     return [
//         [points[index]!, points[index + 1]!],
//         ...makeBounds(points, index + 1),
//     ];
// }

// function isRectangleWithinBounds(
//     rectangle: [Point, Point],
//     bounds: [Point, Point][]
// ): boolean {
//     const [pointA, pointB] = rectangle;
//     const extrapolatedPoints = [
//         { x: pointA.x, y: pointB.y },
//         { x: pointB.x, y: pointA.y },
//     ];
//     const boundXMap = makeBoundXMap(bounds);

//     return extrapolatedPoints.every((point) => {
//         const intersectingBounds = bounds.filter(([pointA, pointB]) => {
//             if (pointA.x === pointB.x) return false;

//             if (
//                 (point.x === pointA.x && point.y === pointA.y) ||
//                 (point.x === pointB.x && point.y === pointB.y)
//             )
//                 return false;

//             const [lesserPoint, greaterPoint] = [pointA, pointB].sort(
//                 (a, b) => a.x - b.x
//             );

//             const boundsAtX = boundXMap.get(point.x)!;
//             const verticalBound = boundsAtX.find(
//                 (boundAtX) =>
//                     boundAtX[0].x === point.x &&
//                     boundAtX[1].x === point.x &&
//                     (boundAtX[0].x === lesserPoint!.x ||
//                         boundAtX[0].x === greaterPoint!.x)
//             );
//             const complementaryBound = verticalBound
//                 ? boundsAtX.find((boundAtX) => {
//                       const sortedPoints = boundAtX.sort((a, b) => a.x - b.x);

//                       const touchesVerticalBound = boundAtX.some(
//                           (x) => x.x === verticalBound![0].x
//                       );
//                       const isNotParallelToOriginalBound =
//                           lesserPoint!.x === sortedPoints[1].x ||
//                           greaterPoint!.x === sortedPoints[0].x;
//                       const isVertical = boundAtX[0].x === boundAtX[1].x;

//                       return (
//                           touchesVerticalBound &&
//                           isNotParallelToOriginalBound &&
//                           !isVertical
//                       );
//                   })
//                 : undefined;

//             const isHigherBoundAtVerticalIntersection =
//                 Boolean(complementaryBound) &&
//                 lesserPoint!.y < complementaryBound![0].y;

//             return (
//                 point.x >= lesserPoint!.x &&
//                 point.x <= greaterPoint!.x &&
//                 point.y > lesserPoint!.y &&
//                 (Boolean(complementaryBound)
//                     ? isHigherBoundAtVerticalIntersection
//                     : true)
//             );
//         });

//         return (
//             intersectingBounds.length !== 0 &&
//             intersectingBounds.length % 2 !== 0
//         );
//     });
// }

// function makeBoundXMap(
//     bounds: [Point, Point][]
// ): Map<number, [Point, Point][]> {
//     const map = new Map<number, [Point, Point][]>();

//     for (const bound of bounds) {
//         bound.forEach((point) =>
//             map.set(point.x, [...(map.get(point.x) ?? []), bound])
//         );
//     }

//     return map;
// }
