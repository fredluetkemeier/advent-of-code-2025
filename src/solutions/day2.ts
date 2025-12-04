export function dayTwo(input: string): [string, string] {
    const idRanges = input
        .split(",")
        .map((x) => x.split("-").map(Number) as IdRange);

    return [partOne(idRanges).toString(), partTwo(idRanges).toString()];
}

// PART 1

type IdRange = [number, number];

function partOne(idRanges: IdRange[]): number {
    const invalidIds = idRanges.reduce(
        (acc: number[], range: IdRange) => [
            ...acc,
            ...findSymmetricalIds(range),
        ],
        []
    );

    return invalidIds.reduce((acc, value) => acc + value, 0);
}

function findSymmetricalIds(range: IdRange): number[] {
    const [start, end] = range;
    let invalidNumbers: number[] = [];

    for (let i = start; i <= end; i++) {
        if (isIdSymmetrical(i.toString())) {
            invalidNumbers = [...invalidNumbers, i];
        }
    }

    return invalidNumbers;
}

function isIdSymmetrical(value: string): boolean {
    const digits = value.split("");

    if (digits.length % 2 !== 0) return false;

    const middleIndex = value.length / 2;
    const firstHalf = digits.slice(0, middleIndex).join("");
    const secondHalf = digits.slice(middleIndex).join("");

    return firstHalf === secondHalf;
}

// PART 2

function partTwo(idRanges: IdRange[]): number {
    const invalidIds = idRanges.reduce(
        (acc: number[], range: IdRange) => [...acc, ...findInvalidIds(range)],
        []
    );

    return invalidIds.reduce((acc, value) => acc + value, 0);
}

function findInvalidIds(range: IdRange): number[] {
    const [start, end] = range;
    let invalidNumbers: number[] = [];

    for (let i = start; i <= end; i++) {
        if (isIdInvalid(i.toString())) {
            invalidNumbers = [...invalidNumbers, i];
        }
    }

    return invalidNumbers;
}

function isIdInvalid(value: string, windowSize: number = 1): boolean {
    const digits = value.split("");

    const maxWindowSize = Math.floor(digits.length / 2);

    if (windowSize > maxWindowSize) {
        return false;
    }

    const windowPattern = digits.slice(0, windowSize).join("");

    for (let i = windowSize; i < digits.length; i += windowSize) {
        const windowSlice = digits.slice(i, i + windowSize).join("");

        if (windowPattern !== windowSlice) {
            return isIdInvalid(value, windowSize + 1);
        }
    }

    return true;
}
