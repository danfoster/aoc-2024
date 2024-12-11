import Puzzle from '../../Puzzle';
import Point from '../../utils/Point';

const possible_dirs: Map<number, Point> = new Map([
    [0, new Point(0, -1)],
    [1, new Point(1, 0)],
    [2, new Point(0, 1)],
    [3, new Point(-1, 0)],
]);

class Grid {
    grid: boolean[][];
    width: number;
    height: number;
    start: Point;
    visited: Map<number, Map<number, number[]>>;
    dir: number;
    pos: Point;

    constructor() {
        this.visited = new Map();
    }

    parse(input: string) {
        this.grid = [];
        let y = 0;
        for (let line of input.split('\n')) {
            if (line == '') {
                continue;
            }
            let x = 0;
            const row = [];
            for (let char of line) {
                row.push(char == '#');
                if (char == '^') {
                    this.start = new Point(x, y);
                }
                x++;
            }

            this.grid.push(row);
            y++;
        }
        this.dir = 0;
        this.height = this.grid.length;
        this.width = this.grid[0].length;
        this.pos = this.start.clone();
    }

    inBounds(pos: Point) {
        return (
            pos.x >= 0 &&
            pos.x < this.width &&
            pos.y >= 0 &&
            pos.y < this.height
        );
    }

    addVisited(pos: Point): boolean {
        if (!this.visited.has(pos.y)) {
            this.visited.set(pos.y, new Map());
        }
        if (!this.visited.get(pos.y).has(pos.x)) {
            this.visited.get(pos.y).set(pos.x, []);
        }
        if (this.visited.get(pos.y).get(pos.x).indexOf(this.dir) == -1) {
            this.visited.get(pos.y).get(pos.x).push(this.dir);
            return false;
        }
        return true;
    }

    move(pos: Point): void {
        const poss_pos = pos.clone();
        poss_pos.add(possible_dirs.get(this.dir));
        if (!this.inBounds(poss_pos)) {
            pos.set(poss_pos);
        } else {
            if (!this.grid[poss_pos.y][poss_pos.x]) {
                pos.set(poss_pos);
            } else {
                this.dir = (this.dir + 1) % 4;
            }
        }
    }

    draw(pos: Point): void {
        let output: string = '';
        for (let y = 0; y < this.height; y++) {
            let line = '';
            for (let x = 0; x < this.width; x++) {
                if (pos.x == x && pos.y == y) {
                    if (this.dir == 0) {
                        line += '^';
                    } else if (this.dir == 1) {
                        line += '>';
                    } else if (this.dir == 2) {
                        line += 'v';
                    } else if (this.dir == 3) {
                        line += '<';
                    }
                } else if (this.hasVisited(x, y)) {
                    line += 'X';
                } else if (this.grid[y][x]) {
                    line += '#';
                } else {
                    line += '.';
                }
            }
            output += line + '\n';
        }
        console.log(output);
    }

    hasVisited(x: number, y: number) {
        return this.visited.has(y) && this.visited.get(y).has(x);
    }

    countVisited(): number {
        let count = 0;
        for (let y of this.visited.values()) {
            count += y.size;
        }
        return count;
    }

    walk(): boolean {
        this.visited = new Map();
        while (this.inBounds(this.pos)) {
            const looped = this.addVisited(this.pos);
            if (looped) {
                return true;
            }
            this.move(this.pos);
        }
        return false;
    }

    clone(): Grid {
        const newgrid = new Grid();
        newgrid.grid = structuredClone(this.grid);
        newgrid.width = this.width;
        newgrid.height = this.height;
        newgrid.start = this.start.clone();
        newgrid.pos = this.start.clone();
        newgrid.dir = 0;
        return newgrid;
    }
}

export default class Day6 extends Puzzle {
    day = '6';

    grid: Grid;

    constructor() {
        super();
    }

    parse(input: string) {
        this.grid = new Grid();
        this.grid.parse(input);
    }

    p1(): number | string {
        const looped = this.grid.walk();
        return this.grid.countVisited();
    }

    p2(): number | string {
        let count = 0;
        for (let [y, xs] of this.grid.visited) {
            for (let x of xs.keys()) {
                const newgrid = this.grid.clone();
                newgrid.grid[y][x] = true;

                const looped = newgrid.walk();
                if (looped) {
                    count++;
                }
            }
        }

        return count;
    }
}
