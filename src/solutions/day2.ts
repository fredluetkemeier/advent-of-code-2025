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

    return invalidIds.reduce((acc, value) => acc + value, 0);
}

function findInvalidNumbers(range: IdRange): number[] {
    const [start, end] = range;
    let invalidNumbers: number[] = [];

    for (let i = start; i <= end; i++) {
        if (isNumberInvalid(i.toString())) {
            invalidNumbers = [...invalidNumbers, i];
        }
    }

    return invalidNumbers;
}

function isNumberInvalid(value: string): boolean {
    const digits = value.split("");

    if (digits.length % 2 !== 0) return false;

    const middleIndex = value.length / 2;
    const firstHalf = digits.slice(0, middleIndex).join("");
    const secondHalf = digits.slice(middleIndex).join("");

    return firstHalf === secondHalf;
}
