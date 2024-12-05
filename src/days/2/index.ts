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

    p1(): number | string {
        let total = 0;
        for (let line of this.lines) {
            const levels = line.split(' ').map(Number);
            let diff = levels[1] - levels[0];
            // console.log(diff);
            let unsafe = false;
            if (diff > 0) {
                // Acending

                for (let i = 0; i < levels.length - 1; i++) {
                    let diff = levels[i + 1] - levels[i];
                    if (diff < 1 || diff > 3) {
                        unsafe = true;
                        break;
                    }
                }
            } else if (diff < 0) {
                // Decending
                for (let i = 0; i < levels.length - 1; i++) {
                    let diff = levels[i] - levels[i + 1];
                    if (diff < 1 || diff > 3) {
                        unsafe = true;
                        break;
                    }
                }
            } else {
                unsafe = true;
            }
            if (!unsafe) {
                total++;
            }
        }
        return total;
    }

    p2(): number | string {
        return 'hippo';
    }
}

if (require.main === module) {
    const puzzle = new Day2();
    puzzle.solve();
}
