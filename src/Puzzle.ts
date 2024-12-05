import readFile from './utils/readFile';

export default class Puzzle {
    read(filename: string): string {
        const puzzlePath = `src/days/${this.day}`;
        const input = readFile(`${puzzlePath}/${filename}`);
        return input;
    }

    solve() {
        this.parse(this.read('input.txt'));
        console.log(this.p1());
        console.log(this.p2());
    }

    parse(input: string) {
        throw new Error('not Implemented');
    }

    p1() {
        throw new Error('not Implemented');
    }

    p2() {
        throw new Error('not Implemented');
    }
}
