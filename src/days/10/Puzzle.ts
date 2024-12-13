import Puzzle from '../../Puzzle';
import Point from '../../utils/Point';
import PointSet from '../../utils/PointSet';

const dirs: Point[] = [
    new Point(0, -1),
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 0),
];

export default class Day10 extends Puzzle {
    day = '10';

    grid: number[][];
    width: number;
    height: number;
    totalp2: number;

    constructor() {
        super();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        this.grid = [];
        const lines = input.split('\n');
        for (const line of lines) {
            this.grid.push(line.split('').map(Number));
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

    findTrailHeads(): Point[] {
        const trailheads = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] == 0) {
                    trailheads.push(new Point(x, y));
                }
            }
        }
        return trailheads;
    }

    walkPath(ends: PointSet, pos: Point): number {
        let total = 0;
        const current_height: number = this.grid[pos.y][pos.x];
        // console.log(`-> ${pos.x},${pos.y} @ ${current_height}`);
        if (current_height == 9) {
            ends.add(pos);
            return 1;
        } else {
            const tpos = pos.clone();
            for (let dir of dirs) {
                tpos.set(pos);
                tpos.add(dir);
                if (
                    this.inBounds(tpos) &&
                    this.grid[tpos.y][tpos.x] == current_height + 1
                ) {
                    // console.log(`${pos.x},${pos.y} ->`);
                    total += this.walkPath(ends, tpos);
                }
            }
        }
        return total;
    }

    p1(): number | string {
        const trailheads = this.findTrailHeads();

        let total = 0;
        this.totalp2 = 0;
        for (const trailhead of trailheads) {
            const ends: PointSet = new PointSet();
            let paths = this.walkPath(ends, trailhead);
            total += ends.size();
            this.totalp2 += paths;
            // console.log(Array.from(ends.getAll()));
        }

        return total;
    }

    p2(): number | string {
        return this.totalp2;
    }
}
