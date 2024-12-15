import Puzzle from '../../Puzzle';

export default class Day13 extends Puzzle {
    day = '13';

    machines: number[][];

    constructor() {
        super();
    }

    parse(input: string) {
        const regex =
            /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d\d)\nPrize: X=(\d+), Y=(\d+)/gm;
        input = input.replace(/\n$/, '');
        let line;
        this.machines = [];
        while ((line = regex.exec(input)) !== null) {
            this.machines.push(line.slice(1, 7).map(Number));
        }
    }

    solveMachine(m: number[], offset = 0): number {
        let [a1, a2, b1, b2, c1, c2] = m;
        c1 += offset;
        c2 += offset;
        const det = a1 * b2 - b1 * a2;

        if (det == 0) {
            return 0;
        }
        const a = (c1 * b2 - b1 * c2) / det;
        const b = (a1 * c2 - c1 * a2) / det;

        // console.log(`${m}: ${a} ${b}`);
        if (a >= 0 && b >= 0 && Number.isInteger(a) && Number.isInteger(b)) {
            return a * 3 + b;
        }
        return 0;
    }

    p1(): number | string {
        let total = 0;
        for (const machine of this.machines) {
            total += this.solveMachine(machine);
        }
        return total;
    }

    p2(): number | string {
        let total = 0;
        for (const machine of this.machines) {
            total += this.solveMachine(machine, 10000000000000);
        }
        return total;
    }
}
