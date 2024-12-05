import Puzzle from '../../Puzzle';

export default class Day3 extends Puzzle {
    day = '3';

    data: string;

    constructor() {
        super();
    }

    findClosestLower(sortedArray: Uint32Array, target: number): number {
        let left = 0;
        let right = sortedArray.length - 1;
        let closest = null;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (sortedArray[mid] <= target) {
                closest = sortedArray[mid]; // Update closest to current mid
                left = mid + 1; // Search the right half
            } else {
                right = mid - 1; // Search the left half
            }
        }

        return closest;
    }

    parse(input: string) {
        this.data = input;
    }

    p1(): number | string {
        let match;
        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
        let total: number = 0;
        while ((match = regex.exec(this.data)) !== null) {
            total += +match[1] * +match[2];
        }
        return total;
    }

    p2(): number | string {
        let match;
        const enables = new Map<number, number>();

        const do_regex = /do\(\)/g;
        enables.set(0, 1);
        while ((match = do_regex.exec(this.data)) !== null) {
            enables.set(+match.index, 1);
        }
        const dont_regex = /don\'t\(\)/g;
        while ((match = dont_regex.exec(this.data)) !== null) {
            enables.set(+match.index, 0);
        }
        const enablesIndexes = new Uint32Array(enables.keys()).sort();

        const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
        let total: number = 0;
        while ((match = regex.exec(this.data)) !== null) {
            const idx = this.findClosestLower(enablesIndexes, match.index);
            if (enables.get(idx) == 1) {
                total += +match[1] * +match[2];
            }
        }
        return total;
    }
}

if (require.main === module) {
    const puzzle = new Day3();
    puzzle.solve();
}
