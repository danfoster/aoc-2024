import Puzzle from '../../Puzzle';

class Equation {
    testvalue: number;
    numbers: number[];

    constructor(input: string) {
        let [value, rest] = input.split(': ');
        this.testvalue = +value;
        this.numbers = rest.split(' ').map(Number);
    }

    isValid(): boolean {
        let values_input: number[];
        let values_output: number[] = [this.numbers[0]];
        for (let i = 1; i < this.numbers.length; i++) {
            values_input = values_output;
            values_output = [];
            for (let n of values_input) {
                let poss = n + this.numbers[i];
                if (poss <= this.testvalue) {
                    values_output.push(poss);
                }
                poss = n * this.numbers[i];
                if (poss <= this.testvalue) {
                    values_output.push(poss);
                }
            }
        }
        return values_output.indexOf(this.testvalue) != -1;
    }

    isValidWithConcat(): boolean {
        let values_input: number[];
        let values_output: number[] = [this.numbers[0]];
        for (let i = 1; i < this.numbers.length; i++) {
            values_input = values_output;
            values_output = [];
            for (let n of values_input) {
                let poss = n + this.numbers[i];
                if (poss <= this.testvalue) {
                    values_output.push(poss);
                }
                poss = n * this.numbers[i];
                if (poss <= this.testvalue) {
                    values_output.push(poss);
                }
                poss = +('' + n + this.numbers[i]);
                if (poss <= this.testvalue) {
                    values_output.push(poss);
                }
            }
        }
        return values_output.indexOf(this.testvalue) != -1;
    }
}
export default class Day7 extends Puzzle {
    day = '7';

    equations: Equation[];

    constructor() {
        super();
    }

    parse(input: string) {
        const lines = input.split('\n');
        this.equations = [];

        for (let line of lines) {
            this.equations.push(new Equation(line));
        }
    }

    p1(): number | string {
        let result: number = 0;
        for (let e of this.equations) {
            if (e.isValid()) {
                result += e.testvalue;
            }
        }
        return result;
    }

    p2(): number | string {
        let result: number = 0;
        for (let e of this.equations) {
            if (e.isValidWithConcat()) {
                result += e.testvalue;
            }
        }
        return result;
    }
}
