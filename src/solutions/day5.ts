export function dayFive(input: string): [string, string] {
    const { freshRanges, ids } = parseInput(input);

    return [
        partOne(freshRanges, ids).toString(),
        partTwo(freshRanges).toString(),
    ];
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
    const freshIds = ids.filter((id) =>
        freshRanges.find(([start, end]) => id >= start && id <= end)
    );

    return freshIds.length;
}

// PART 2

function partTwo(freshRanges: IdRange[]): number {
    const combinedRanges = combineRanges(freshRanges);

    return combinedRanges.reduce(
        (acc, [start, end]) => acc + (end - start + 1),
        0
    );
}

function combineRanges(ranges: IdRange[]): IdRange[] {
    return ranges
        .sort(([aStart], [bStart]) => {
            return aStart - bStart;
        })
        .reduce<IdRange[]>((acc, [start, end]) => {
            const lastCollapsedRange = acc[acc.length - 1];

            if (!lastCollapsedRange) return [...acc, [start, end]];

            const [startLast, endLast] = lastCollapsedRange;

            if (start >= startLast && start <= endLast) {
                return [
                    ...acc.slice(0, acc.length - 1),
                    [Math.min(start, startLast), Math.max(end, endLast)],
                ];
            }

            return [...acc, [start, end]];
        }, []);
}
