export function dayOne(inputs: string[]): [string, string] {
    return ["", partTwo(inputs).toString()];
}

// PART 1

function partOne(inputs: string[], dialPosition: number = 50): number {
    if (inputs.length == 0) return 0;

    const [value, ...rest] = inputs;

    const rotation = parseDialRotation(value!);
    const newPosition = rotateDial(dialPosition, rotation);

    return (newPosition === 0 ? 1 : 0) + partOne(rest ?? [], newPosition);
}

// PART 2

function partTwo(inputs: string[]): number {
    const rotations = parseDialRotations(inputs);

    let dialPosition = 50;
    let zeroCount = 0;

    for (const [direction, distance] of rotations) {
        zeroCount += Math.floor(distance / 100);

        const adjustedDistance = distance % 100;

        if (direction === "left") {
            const positionValue = dialPosition - adjustedDistance;

            if (positionValue < 0) {
                const prevPosition = dialPosition;
                dialPosition = 100 + positionValue;

                if (dialPosition !== 0 && prevPosition !== 0) {
                    zeroCount += 1;
                }
            } else {
                dialPosition = positionValue;
            }

            if (dialPosition === 0) {
                zeroCount += 1;
            }
        } else {
            const positionValue = dialPosition + adjustedDistance;

            if (positionValue > 99) {
                const prevPosition = dialPosition;
                dialPosition = positionValue - 100;

                if (dialPosition !== 0 && prevPosition !== 0) {
                    zeroCount += 1;
                }
            } else {
                dialPosition = positionValue;
            }

            if (dialPosition === 0) {
                zeroCount += 1;
            }
        }
    }

    return zeroCount;
}

// SHARED

type Direction = "left" | "right";

function parseDialRotations(values: string[]): [Direction, number][] {
    return values.map((x) => [
        x.slice(0, 1) === "L" ? "left" : "right",
        Number(x.slice(1)),
    ]);
}

function parseDialRotation(value: string): number {
    const parsedRotation = value.slice(1);
    return Number(value.slice(0, 1) === "L" ? -parsedRotation : parsedRotation);
}

function rotateDial(position: number, rotation: number): number {
    const adjustedRotation =
        Math.abs(rotation) > 100 ? rotation % 100 : rotation;
    const positionValue = position + adjustedRotation;

    if (positionValue < 0) return 100 + positionValue;

    if (positionValue > 99) return positionValue - 100;

    return positionValue;
}
