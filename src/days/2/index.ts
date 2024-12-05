import Puzzle from '../../Puzzle';

export default class Day2 extends Puzzle {
    day = '2';

    length: number;
    lines: string[];

    constructor() {
        super();
    }

    parse(input: string) {
        this.lines = input.split('\n');
        this.length = this.lines.length;
    }

    isLevelSafe(levels: number[]): boolean {
        let diff = levels[1] - levels[0];
        if (diff > 0) {
            // Acending

            for (let i = 0; i < levels.length - 1; i++) {
                let diff = levels[i + 1] - levels[i];
                if (diff < 1 || diff > 3) {
                    return false;
                }
            }
        } else if (diff < 0) {
            // Decending
            for (let i = 0; i < levels.length - 1; i++) {
                let diff = levels[i] - levels[i + 1];
                if (diff < 1 || diff > 3) {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    isLevelSafeWithDampener(levels: number[]): boolean {
        if (this.isLevelSafe(levels)) {
            return true;
        } else {
            for (let i = 0; i < levels.length; i++) {
                let newLevels = levels.toSpliced(i, 1);
                if (this.isLevelSafe(newLevels)) {
                    return true;
                }
            }
        }
        return false;
    }

    p1(): number | string {
        let total = 0;
        for (let line of this.lines) {
            const levels = line.split(' ').map(Number);
            if (this.isLevelSafe(levels)) {
                total++;
            }
        }
        return total;
    }

    p2(): number | string {
        let total = 0;
        for (let line of this.lines) {
            const levels = line.split(' ').map(Number);
            if (this.isLevelSafeWithDampener(levels)) {
                total++;
            }
        }
        return total;
    }
}

if (require.main === module) {
    const puzzle = new Day2();
    puzzle.solve();
}
