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
    return crypto.createHash("sha1").update(`${x},${y},${z}`).digest("hex");
}

// PART 1

function partOne(boxes: Box[]): number {
    findClosestBoxes(boxes);

    return 0;
}

function findClosestBoxes(availableBoxes: Box[]) {
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

    const sortedBoxPermutations = [...boxPermutations.values()].sort(
        (a, b) => a.distance - b.distance
    );

    console.log(sortedBoxPermutations.slice(0, 10).map((x) => x.boxes));

    // const temp = availableBoxes.reduce<[Box, Box][]>(
    //     (accA, boxA) => [
    //         ...accA,
    //         ...availableBoxes.reduce<[Box, Box][]>(
    //             (accB, boxB) => [...accB, [boxA, boxB]],
    //             []
    //         ),
    //     ],
    //     []
    // );

    // console.log(temp);

    // const sortedBoxes = availableBoxes.sort(
    //     (a, b) =>
    //         Math.pow(a.x - b.x, 2) +
    //         Math.pow(a.y - b.y, 2) +
    //         Math.pow(a.z - b.z, 2)
    // );

    // // console.log(sortedBoxes);

    return [];
}
