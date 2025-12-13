export function dayOne(input: string): [number, number] {
    const inputList = input.split("\n").map((x) => x.trim());

    return [partOne(inputList), partTwo(inputList)];
}

// PART 1

function partOne(inputs: string[], dialPosition: number = 50): number {
    if (inputs.length == 0) return 0;

    const [value, ...rest] = inputs;

    const rotation = parseDialRotation(value!);
    const newPosition = rotateDial(dialPosition, rotation);

    return (newPosition === 0 ? 1 : 0) + partOne(rest, newPosition);
}

function rotateDial(position: number, rotation: number): number {
    const adjustedRotation = rotation % 100;
    const positionValue = position + adjustedRotation;

    if (positionValue < 0) return 100 + positionValue;

    if (positionValue > 99) return positionValue - 100;

    return positionValue;
}

// PART 2

function partTwo(inputs: string[], dialPosition: number = 50): number {
    if (inputs.length == 0) return 0;

    const [value, ...rest] = inputs;

    const rotation = parseDialRotation(value!);

    const adjustedDistance = rotation % 100;

    const adjustedDialPosition = dialPosition + adjustedDistance;
    const newDialPosition =
        adjustedDialPosition < 0 || adjustedDialPosition > 99
            ? wrapDialPosition(adjustedDialPosition)
            : adjustedDialPosition;

    return (
        countZeroes(
            dialPosition,
            rotation,
            adjustedDialPosition,
            newDialPosition
        ) + partTwo(rest, newDialPosition)
    );
}

function countZeroes(
    dialPosition: number,
    rotation: number,
    adjustedDialPosition: number,
    newDialPosition: number
): number {
    const fullRotationZeroCount = Math.floor(Math.abs(rotation) / 100);
    const isDialOutOfBounds =
        adjustedDialPosition < 0 || adjustedDialPosition > 99;

    if (isDialOutOfBounds && dialPosition !== 0 && newDialPosition !== 0) {
        return 1 + fullRotationZeroCount;
    }

    if (newDialPosition === 0) {
        return 1 + fullRotationZeroCount;
    }

    return fullRotationZeroCount;
}

function wrapDialPosition(dialPosition: number): number {
    return dialPosition < 0 ? 100 + dialPosition : dialPosition - 100;
}

// SHARED

function parseDialRotation(value: string): number {
    const parsedRotation = value.slice(1);
    return Number(value.slice(0, 1) === "L" ? -parsedRotation : parsedRotation);
}
