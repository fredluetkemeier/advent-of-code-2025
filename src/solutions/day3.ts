export function dayThree(input: string): [string, string] {
    const batteryBanks = input.split("\n");

    return [partOne(batteryBanks).toString(), partTwo(batteryBanks).toString()];
}

// PART 1

type Battery = {
    index: number;
    value: number;
};

function partOne(batteryBanks: string[]): number {
    if (batteryBanks.length == 0) return 0;

    const [batteryBank, ...rest] = batteryBanks;
    const batteries = getBatteriesFromBank(batteryBank!);
    const maxJoltage = findMaxJoltage(batteries);

    return maxJoltage + partOne(rest);
}

function getBatteriesFromBank(batteryBank: string): Battery[] {
    return batteryBank
        .trim()
        .split("")
        .map((x, index) => ({ index, value: Number(x) }));
}

function findMaxJoltage(batteries: Battery[]): number {
    const sortedBatteries = sortBatteries(batteries);

    const firstBattery = sortedBatteries.find(
        (x) => x.index !== batteries.length - 1
    );
    const secondBattery = sortBatteries(
        sortedBatteries.filter((x) => x.index > firstBattery!.index)
    )[0]!;

    return Number(`${firstBattery?.value}${secondBattery?.value}`);
}

function sortBatteries(batteries: Battery[]): Battery[] {
    return [...batteries].sort((a, b) => b.value - a.value);
}

// PART 2

function partTwo(batteryBanks: string[]): number {
    if (batteryBanks.length == 0) return 0;

    const [batteryBank, ...rest] = batteryBanks;
    const batteries = getBatteriesFromBank(batteryBank!);
    const maxJoltage = findLargestBatteries(batteries)
        .map((x) => x.value)
        .join("");

    console.log(maxJoltage);

    return Number(maxJoltage) + partTwo(rest);
}

function findLargestBatteries(
    batteries: Battery[],
    currentIndex: number = 0,
    digitsNeeded: number = 12
): Battery[] {
    // console.log({ batteries, currentIndex, digitsNeeded });

    if (digitsNeeded === 0) return [];
    if (batteries.length - (currentIndex + 1) <= digitsNeeded)
        return batteries.slice(currentIndex);

    const endIndex = -(digitsNeeded - 1);
    const largestAvailableBattery = [...batteries]
        .slice(currentIndex, endIndex < 0 ? endIndex : undefined)
        .sort((a, b) => {
            if (a.value === b.value) return a.index - b.index;

            return b.value - a.value;
        })[0]!;

    return [
        largestAvailableBattery,
        ...findLargestBatteries(
            batteries,
            largestAvailableBattery.index + 1,
            digitsNeeded - 1
        ),
    ];

    // if (digitsNeeded === 0) return [];

    // console.log({ currentIndex, digitsNeeded });
    // console.log([...batteries.slice(currentIndex, digitsNeeded - 1)]);

    // const largestAvailableBattery = [
    //     ...batteries.slice(currentIndex, digitsNeeded - 1),
    // ].sort((a, b) => {
    //     if (a.value === b.value) return a.index - b.index;

    //     return b.value - a.value;
    // })[0]!;

    // return [
    //     largestAvailableBattery,
    //     ...findLargestBatteries(
    //         batteries,
    //         largestAvailableBattery.index + 1,
    //         digitsNeeded - 1
    //     ),
    // ];
}
