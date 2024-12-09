import Puzzle from '../../Puzzle';
import Point from '../../utils/Point';

export default class Day4 extends Puzzle {
    day = '4';

    grid: string[][];
    width: number;
    height: number;

    constructor() {
        super();
    }

    parse(input: string) {
        this.grid = [];
        for (let line of input.split('\n')) {
            this.grid.push(line.split(''));
        }
        this.height = this.grid.length;
        this.width = this.grid[0].length;
    }

    inBounds(pos: Point) {
        return (
            pos.x >= 0 &&
            pos.x < this.width &&
            pos.y >= 0 &&
            pos.y < this.height
        );
    }

    inBoundsWithBorder(pos: Point) {
        return (
            pos.x >= 1 &&
            pos.x < this.width - 1 &&
            pos.y >= 1 &&
            pos.y < this.height - 1
        );
    }

    globalFind(char: string): Point[] {
        const points: Point[] = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] === char) {
                    points.push(new Point(x, y));
                }
            }
        }
        return points;
    }

    getStringInDir(pos: Point, length: number, dir: Point) {
        let word: string = '';
        for (let i: number = 0; i < length; i++) {
            word += this.grid[pos.y][pos.x];
            pos.add(dir);
            if (!this.inBounds(pos)) {
                return word;
            }
        }
        return word;
    }

    findStringsFrom(start: Point, length: number) {
        const dirs: Point[] = [
            new Point(0, -1),
            new Point(1, -1),
            new Point(1, 0),
            new Point(1, 1),
            new Point(0, 1),
            new Point(-1, 1),
            new Point(-1, 0),
            new Point(-1, -1),
        ];

        const pos = new Point(0, 0);
        const words: string[] = [];
        for (let dir of dirs) {
            pos.set(start);
            words.push(this.getStringInDir(pos, length, dir));
        }
        return words;
    }

    findCrossStrings(start: Point): string[] {
        const word1 =
            this.grid[start.y - 1][start.x - 1] +
            this.grid[start.y][start.x] +
            this.grid[start.y + 1][start.x + 1];
        const word2 =
            this.grid[start.y - 1][start.x + 1] +
            this.grid[start.y][start.x] +
            this.grid[start.y + 1][start.x - 1];
        return [word1, word2];
    }

    p1(): number | string {
        const points = this.globalFind('X');
        let result = 0;
        for (let point of points) {
            let words = this.findStringsFrom(point, 4);
            for (let word of words) {
                if (word === 'XMAS') {
                    result++;
                }
            }
        }
        return result;
    }

    p2(): number | string {
        const points = this.globalFind('A');
        let result = 0;
        for (let point of points) {
            if (!this.inBoundsWithBorder(point)) {
                continue;
            }
            const [word1, word2] = this.findCrossStrings(point);
            if (
                (word1 == 'MAS' || word1 == 'SAM') &&
                (word2 == 'MAS' || word2 == 'SAM')
            ) {
                result++;
            }
        }

        return result;
    }
}

if (require.main === module) {
    const puzzle = new Day4();
    puzzle.solve();
}
