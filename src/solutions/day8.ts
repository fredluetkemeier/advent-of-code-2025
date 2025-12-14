import crypto from "crypto";

export function dayEight(input: string): [number, number] {
    const boxes = parseInput(input);

    return [partOne(boxes), 0];
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

function getClosestBoxPairs(availableBoxes: Box[]): BoxPair[] {
    const boxPermutations = new Map<
        string,
        {
            boxes: [Box, Box];
            distance: number;
        }
    >();
    for (const boxA of availableBoxes) {
        for (const boxB of availableBoxes) {
            if (boxA.id === boxB.id) continue;

            const boxPair: [Box, Box] = [boxA, boxB];
            const key = crypto
                .createHash("sha1")
                .update(
                    boxPair
                        .map((x) => x.id)
                        .sort()
                        .join("-")
                )
                .digest("hex");

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

function makeCircuits(boxPairs: BoxPair[]) {
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
