export function dayThree(input: string): [string, string] {
    const batteryBanks = input.split("\n");

    return [partOne(batteryBanks).toString(), ""];
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
