import Puzzle from '../../Puzzle';

export default class Day1 extends Puzzle {
    day = '1';

    length: number;

    constructor() {
        super();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        const lines = input.split('\n');
        this.length = lines.length;
    }

    p1(): number | string {
        return 'hippo';
    }

    p2(): number | string {
        return 'hippo';
    }
}
