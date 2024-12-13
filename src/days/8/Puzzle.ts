import Puzzle from '../../Puzzle';
import Point from '../../utils/Point';
import PointSet from '../../utils/PointSet';

export default class Day8 extends Puzzle {
    day = '8';

    width: number;
    height: number;
    antennas: Map<string, Point[]>;

    constructor() {
        super();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        const lines = input.split('\n');

        this.width = lines[0].length;
        this.height = lines.length;
        this.antennas = new Map();

        for (let y = 0; y < this.height; y++) {
            const line = lines[y];

            for (let x = 0; x < this.width; x++) {
                const c = line[x];
                if (c == '.') {
                    continue;
                }
                if (!this.antennas.has(c)) {
                    this.antennas.set(c, []);
                }
                this.antennas.get(c).push(new Point(x, y));
            }
        }
    }

    inBounds(pos: Point) {
        return (
            pos.x >= 0 &&
            pos.x < this.width &&
            pos.y >= 0 &&
            pos.y < this.height
        );
    }

    draw(antinodes: PointSet) {
        const lines: string[][] = [];
        for (let y = 0; y < this.height; y++) {
            lines.push(Array(this.width).fill('.'));
        }
        for (const [c, points] of this.antennas) {
            for (let p of points) {
                lines[p.y][p.x] = c;
            }
        }
        for (const p of antinodes.getAll()) {
            lines[p.y][p.x] = '#';
        }
        console.log(lines.map((r) => r.join('')).join('\n'));
    }

    p1(): number | string {
        const antinodes = new PointSet();
        for (let al of this.antennas.values()) {
            for (let a of al) {
                for (let b of al) {
                    if (a == b) {
                        continue;
                    }
                    const t = a.clone();
                    const dx = (b.x - a.x) * 2;
                    const dy = (b.y - a.y) * 2;
                    t.x += dx;
                    t.y += dy;
                    if (this.inBounds(t)) {
                        antinodes.add(t);
                    }
                }
            }
        }

        // console.log(Array.from(antinodes.getAll()));
        // this.draw(antinodes);
        return antinodes.size();
    }

    p2(): number | string {
        const antinodes = new PointSet();
        for (let al of this.antennas.values()) {
            for (let a of al) {
                for (let b of al) {
                    if (a == b) {
                        continue;
                    }

                    const dx = b.x - a.x;
                    const dy = b.y - a.y;

                    const t = a.clone();
                    while (true) {
                        t.x += dx;
                        t.y += dy;
                        if (this.inBounds(t)) {
                            antinodes.add(t.clone());
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        return antinodes.size();
    }
}
