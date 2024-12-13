import Puzzle from '../../Puzzle';

function memoizeMethod<T extends (...args: unknown[]) => unknown>(
    fn: T
): (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T> {
    const cache = new Map<string, ReturnType<T>>();
    return function (
        this: ThisParameterType<T>,
        ...args: Parameters<T>
    ): ReturnType<T> {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            // console.log('Fetching from cache:', key);
            return cache.get(key) as ReturnType<T>;
        }
        // console.log('Computing result for:', key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

export default class Day11 extends Puzzle {
    day = '11';

    stones: number[];
    stoneCache: Map<string, number>;

    constructor() {
        super();
        this.stoneCache = new Map();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        this.stones = input.split(' ').map(Number);
    }

    stepCount(stone: number, count: number): number {
        if (count == 0) {
            return 1;
        }

        if (stone == 0) {
            return this.memoizedStepCount(1, count - 1);
        }

        let str_data = stone.toString();
        let str_len = str_data.length;

        if (str_len % 2 == 0) {
            const data1: number = +str_data.slice(0, str_len / 2);
            const data2: number = +str_data.slice(str_len / 2);
            return (
                this.memoizedStepCount(data1, count - 1) +
                this.memoizedStepCount(data2, count - 1)
            );
        }

        return this.memoizedStepCount(stone * 2024, count - 1);
    }

    memoizedStepCount = memoizeMethod(this.stepCount);

    p1(): number | string {
        let total = 0;
        for (const stone of this.stones) {
            total += this.memoizedStepCount(stone, 25);
        }
        return total;
    }

    p2(): number | string {
        let total = 0;
        for (const stone of this.stones) {
            total += this.memoizedStepCount(stone, 75);
        }
        return total;
        return this.stones.length;
    }
}
