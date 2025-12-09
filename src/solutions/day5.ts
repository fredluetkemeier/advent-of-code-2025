export function dayFive(input: string): [string, string] {
    const { freshRanges, ids } = parseInput(input);

    console.log(freshRanges, ids);

    return [partOne(freshRanges, ids).toString(), ""];
}

type IdRange = [number, number];

function parseInput(input: string): { freshRanges: IdRange[]; ids: number[] } {
    const [rangesString, idsString] = input.trim().split("\n\n");

    return {
        freshRanges: rangesString!
            .split("\n")
            .map((x) => x.split("-").map(Number) as IdRange),
        ids: idsString!.split("\n").map(Number),
    };
}

// PART 1

function partOne(freshRanges: IdRange[], ids: number[]): number {
    return 0;
}
