export function dayOne(inputs: string[]): [string, string] {
    return [partOne(inputs).toString(), ""];
}

function partOne(inputs: string[], dialPosition: number = 50): number {
    if (inputs.length == 0) return 0;

    const [value, ...rest] = inputs;

    const rotation = parseDialRotation(value!);
    const newPosition = rotateDial(dialPosition, rotation);

    console.log(newPosition);

    return (newPosition === 0 ? 1 : 0) + partOne(rest ?? [], newPosition);
}

function parseDialRotation(value: string): number {
    const parsedRotation = value.slice(1);
    return Number(value.slice(0, 1) === "L" ? -parsedRotation : parsedRotation);
}

function rotateDial(position: number, rotation: number): number {
    const positionValue = position + rotation;

    console.log(position, rotation, positionValue);

    if (positionValue < 0) return 100 + (positionValue % 100);

    if (positionValue > 99) return positionValue % 100;

    return positionValue;
}
