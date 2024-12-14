import Puzzle from '../../Puzzle';
import Point from '../../utils/Point';
import PointSet from '../../utils/PointSet';

const dirs: Point[] = [
    new Point(0, -1),
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 0),
];

export default class Day12 extends Puzzle {
    day = '12';

    grid: string[][];
    width: number;
    height: number;

    tovisit: PointSet;
    visited: PointSet;

    totalp2: number;

    constructor() {
        super();
    }

    gridGet(p: Point): string {
        return this.grid?.[p.y]?.[p.x];
    }

    inBounds(pos: Point) {
        return (
            pos.x >= 0 &&
            pos.x < this.width &&
            pos.y >= 0 &&
            pos.y < this.height
        );
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        this.grid = [];
        const lines = input.split('\n');
        for (const line of lines) {
            this.grid.push(line.split(''));
        }
        this.height = this.grid.length;
        this.width = this.grid[0].length;
    }

    fingerprintSection(p: Point, l: string): number {
        const corners: Point[][] = [
            [new Point(-1, -1), new Point(-1, 0), new Point(0, -1)],
            [new Point(-1, 1), new Point(-1, 0), new Point(0, 1)],
            [new Point(1, 1), new Point(1, 0), new Point(0, 1)],
            [new Point(1, -1), new Point(1, 0), new Point(0, -1)],
        ];
        let fenceEdges = 0;
        for (const [c, e1, e2] of corners) {
            c.add(p);
            e1.add(p);
            e2.add(p);
            const l1 = this.gridGet(e1);
            const l2 = this.gridGet(e2);
            if (
                (this.gridGet(c) != l && l1 == l && l2 == l) ||
                (l1 != l && l2 != l)
            ) {
                fenceEdges++;
            }
        }
        // console.log(`Process area ${l}, [${p.x},${p.y}] == ${fenceEdges}`);
        return fenceEdges;
    }

    fill(start: Point): number[] {
        const plist: Point[] = [start];
        const arealabel = this.gridGet(start);
        let area = 0;
        let fences = 0;
        let sizes = 0;

        this.visited.add(start);
        // console.log(`${start}: ${Array.from(this.visited.getAll()).join(' ')}`);
        // console.log(`TV: ${Array.from(this.tovisit.getAll()).join(' ')}`);
        while (plist.length > 0) {
            const p = plist.pop();
            // console.log(`... ${arealabel} [${p.x},${p.y}]`);
            area++;
            sizes += this.fingerprintSection(p, arealabel);
            for (const i in dirs) {
                const dir = dirs[i];

                const tp = p.clone();
                tp.add(dir);
                if (!this.inBounds(tp)) {
                    fences++;
                } else if (this.gridGet(tp) == arealabel) {
                    if (!this.visited.exists(tp)) {
                        this.visited.add(tp);
                        this.tovisit.pop(tp);
                        plist.push(tp);
                    }
                } else {
                    fences++;
                    if (!this.visited.exists(tp)) {
                        this.tovisit.add(tp);
                    }
                }
            }
        }

        // console.log(`${arealabel}: ${area} ${fences} ${sizes}`);
        return [area * fences, area * sizes];
    }

    p1(): number | string {
        this.tovisit = new PointSet();
        this.tovisit.add(new Point(0, 0));
        this.visited = new PointSet();

        let p: Point;
        let totalp1 = 0;
        this.totalp2 = 0;

        while ((p = this.tovisit.popFirst()) != null) {
            const [dp1, dp2] = this.fill(p);
            totalp1 += dp1;
            this.totalp2 += dp2;
        }

        return totalp1;
    }

    p2(): number | string {
        return this.totalp2;
    }
}
