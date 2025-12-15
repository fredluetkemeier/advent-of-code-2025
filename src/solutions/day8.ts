export function dayEight(input: string): [number, number] {
    const boxes = parseInput(input);

    return [partOne(boxes), partTwo(boxes)];
}

type Box = {
    id: string;
    x: number;
    y: number;
    z: number;
};

function parseInput(input: string): Box[] {
    return input.split("\n").map((row) => {
        const [x, y, z] = row.split(",");
        return {
            id: makeBoxId(x!, y!, z!),
            x: Number(x!),
            y: Number(y!),
            z: Number(z!),
        };
    });
}

function makeBoxId(x: string, y: string, z: string): string {
    return `${x},${y},${z}`;
}

// PART 1

function partOne(boxes: Box[]): number {
    const boxPairs = getClosestBoxPairs(boxes);
    const circuits = makeCircuits(boxPairs.slice(0, 1000));

    return circuits
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)
        .reduce((acc, x) => acc * x.size, 1);
}

type BoxPair = {
    boxes: [Box, Box];
    distance: number;
};

function getClosestBoxPairs(boxes: Box[]): BoxPair[] {
    const boxPermutations = new Map<string, BoxPair>();
    for (const boxA of boxes) {
        for (const boxB of boxes) {
            if (boxA.id === boxB.id) continue;

            const boxPair: [Box, Box] = [boxA, boxB];
            const key = boxPair
                .map((x) => x.id)
                .sort()
                .join("-");

            if (boxPermutations.has(key)) continue;

            boxPermutations.set(key, {
                boxes: boxPair,
                distance:
                    Math.pow(boxA.x - boxB.x, 2) +
                    Math.pow(boxA.y - boxB.y, 2) +
                    Math.pow(boxA.z - boxB.z, 2),
            });
        }
    }

    return [...boxPermutations.values()].sort(
        (a, b) => a.distance - b.distance
    );
}

function makeCircuits(boxPairs: BoxPair[]): Set<string>[] {
    return boxPairs.reduce<Set<string>[]>((acc, { boxes: [boxA, boxB] }) => {
        const [circuitsWithPair, rest] = acc.reduce<
            [Set<string>[], Set<string>[]]
        >(
            (acc, x) =>
                x.has(boxA.id) || x.has(boxB.id)
                    ? [[...acc[0], x], acc[1]]
                    : [acc[0], [...acc[1], x]],
            [[], []]
        );

        const boxIds = [boxA, boxB].map((x) => x.id);

        if (circuitsWithPair.length > 0) {
            const newCircuit = circuitsWithPair.reduce(
                (acc, circuit) => acc.union(circuit),
                new Set(boxIds)
            );

            return [...rest, newCircuit];
        }

        return [...acc, new Set(boxIds)];
    }, []);
}

// PART 2

function partTwo(boxes: Box[]): number {
    const boxPairs = getClosestBoxPairs(boxes);
    const {
        boxes: [{ x: xA }, { x: xB }],
    } = findPairThatCompletesCircuit(boxPairs, boxes.length)!;

    return xA * xB;
}

function findPairThatCompletesCircuit(
    boxPairs: BoxPair[],
    boxCount: number
): BoxPair | undefined {
    const { pair } = boxPairs.reduce<{
        circuits: Set<string>[];
        pair: BoxPair | undefined;
    }>(
        (acc, boxPair) => {
            if (acc.pair) return acc;

            const {
                boxes: [boxA, boxB],
            } = boxPair;

            const [circuitsWithPair, rest] = acc.circuits.reduce<
                [Set<string>[], Set<string>[]]
            >(
                (acc, x) =>
                    x.has(boxA.id) || x.has(boxB.id)
                        ? [[...acc[0], x], acc[1]]
                        : [acc[0], [...acc[1], x]],
                [[], []]
            );

            const boxIds = [boxA, boxB].map((x) => x.id);
            const newCircuits =
                circuitsWithPair.length > 0
                    ? [
                          ...rest,
                          circuitsWithPair.reduce(
                              (acc, circuit) => acc.union(circuit),
                              new Set(boxIds)
                          ),
                      ]
                    : [...acc.circuits, new Set(boxIds)];

            return {
                circuits: newCircuits,
                pair:
                    newCircuits.length === 1 &&
                    newCircuits[0]?.size === boxCount
                        ? boxPair
                        : undefined,
            };
        },
        { circuits: [], pair: undefined }
    );

    return pair;
}
