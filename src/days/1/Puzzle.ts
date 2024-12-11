import Puzzle from '../../Puzzle';

export default class Day1 extends Puzzle {
    day = '1';
    firstSolution = 936063;
    exampleFirstSolution = 11;
    secondSolution = 999;
    exampleSecondSolution = 31;

    leftList: Uint32Array;
    rightList: Uint32Array;

    length: number;

    constructor() {
        super();
    }

    parse(input: string) {
        const lines = input.split('\n');
        this.length = lines.length;

        this.leftList = new Uint32Array(this.length);
        this.rightList = new Uint32Array(this.length);

        for (let i = 0; i < this.length; i++) {
            const [left, right] = lines[i].split('   ');
            this.leftList[i] = +left;
            this.rightList[i] = +right;
        }
    }

    p1() {
        this.leftList.sort();
        this.rightList.sort();

        let total: number = 0;
        for (let i = 0; i < this.length; i++) {
            total += Math.abs(this.rightList[i] - this.leftList[i]);
        }

        return total;
    }

    p2() {
        const rightMap = new Map();

        let count: number = 0;
        let prevNum: number = this.rightList[0];
        for (let i = 0; i < this.length; i++) {
            if (this.rightList[i] != prevNum) {
                rightMap.set(prevNum, count);
                count = 0;
                prevNum = this.rightList[i];
            }
            count += 1;
        }

        let total: number = 0;
        for (let i = 0; i < this.length; i++) {
            const num = this.leftList[i];
            total += num * (rightMap.get(num) || 0);
        }

        return total;
    }
}
