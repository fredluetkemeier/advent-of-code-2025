import fs from "fs";

export function dayTwo(input: string): [string, string] {
    const idRanges = input
        .split(",")
        .map((x) => x.split("-").map(Number) as IdRange);

    return [partOne(idRanges).toString(), ""];
}

// PART 1

type IdRange = [number, number];

function partOne(idRanges: IdRange[]): number {
    const invalidIds = idRanges.reduce(
        (acc: number[], range: IdRange) => [
            ...acc,
            ...findInvalidNumbers(range),
        ],
        []
    );

    console.log(invalidIds);

    fs.writeFileSync("./invalidIds.txt", JSON.stringify(invalidIds, null, 4));

    return invalidIds.reduce((acc, value) => acc + value, 0);
}

function findInvalidNumbers(range: IdRange): number[] {
    const [start, end] = range;
    let invalidNumbers: number[] = [];

    for (let i = start; i <= end; i++) {
        // console.log(i);

        if (isNumberInvalid(i)) {
            invalidNumbers = [...invalidNumbers, i];
        }
    }

    return invalidNumbers;
}

function isNumberInvalid(value: number, windowSize: number = 1): boolean {
    const digits = value.toString().split("");

    if (digits.length % 2 !== 0) return false;

    const maxWindowSize = Math.floor(digits.length / 2);
    // const isWindowCompatible = digits.length % windowSize === 0;

    if (windowSize > maxWindowSize) {
        return false;
    }

    const windowPattern = digits.slice(0, windowSize).join("");

    // console.log("windowPattern", windowPattern);

    for (let i = windowSize; i < digits.length; i += windowSize) {
        const windowSlice = digits.slice(i, i + windowSize).join("");

        // console.log({ windowPattern, windowSlice, i });

        if (windowPattern !== windowSlice) {
            return isNumberInvalid(value, windowSize + 1);
        }
    }

    return true;
}
