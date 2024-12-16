import Puzzle from '../../Puzzle';

class Robot {
    x: number;
    y: number;
    dx: number;
    dy: number;

    constructor(x: number, y: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    multiStep(width: number, height: number, steps: number) {
        for (let i = 0; i < steps; i++) {
            this.step(width, height);
        }
    }

    step(width: number, height: number) {
        this.x = (this.x + this.dx) % width;
        this.y = (this.y + this.dy) % height;
        if (this.x < 0) {
            this.x += width;
        }
        if (this.y < 0) {
            this.y += height;
        }
    }

    isAt(x: number, y: number) {
        return this.x == x && this.y == y;
    }
    toString() {
        return `[${this.x},${this.y}] (${this.dx},${this.dy})`;
    }
}
export default class Day14 extends Puzzle {
    day = '14';

    width: number;
    height: number;
    robots: Robot[];

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        const regex = /p=(\d+),(\d+) v=([-]?\d+),([-]?\d+)/gm;
        let line;
        this.robots = [];
        while ((line = regex.exec(input)) !== null) {
            this.robots.push(new Robot(+line[1], +line[2], +line[3], +line[4]));
        }
    }

    countRobotsInArea(x1: number, y1: number, x2: number, y2: number) {
        let total = 0;
        for (const robot of this.robots) {
            if (robot.x > x1 && robot.x < x2 && robot.y > y1 && robot.y < y2) {
                total++;
            }
        }
        return total;
    }

    draw() {
        const output = [];
        for (let y = 0; y < this.height; y++) {
            const line = [];
            for (let x = 0; x < this.width; x++) {
                let n = 0;
                for (const robot of this.robots) {
                    if (robot.isAt(x, y)) {
                        n++;
                    }
                }
                if (n > 0) {
                    line.push(n.toString());
                } else {
                    line.push('.');
                }
            }
            output.push(line.join(''));
        }
        console.log(output.join('\n'));
    }

    safetyFactor(): number {
        const q1 = this.countRobotsInArea(
            -1,
            -1,
            (this.width - 1) / 2,
            (this.height - 1) / 2
        );
        const q2 = this.countRobotsInArea(
            (this.width - 1) / 2,
            -1,
            this.width,
            (this.height - 1) / 2
        );
        const q3 = this.countRobotsInArea(
            -1,
            (this.height - 1) / 2,
            (this.width - 1) / 2,
            this.height
        );
        const q4 = this.countRobotsInArea(
            (this.width - 1) / 2,
            (this.height - 1) / 2,
            this.width,
            this.height
        );
        // console.log(`${q1} ${q2} ${q3} ${q4}`);
        return q1 * q2 * q3 * q4;
    }

    p1(): number | string {
        for (const robot of this.robots) {
            // console.log(robot);
            robot.multiStep(this.width, this.height, 100);
        }
        return this.safetyFactor();
    }

    p2(): number | string {
        // console.log(robot);
        for (let i = 0; i < 50000; i++) {
            for (const robot of this.robots) {
                robot.step(this.width, this.height);
            }
            const sf = this.safetyFactor();
            if (sf < 120000000) {
                // this.draw();
                return i + 101;
            }
        }
        return -1;
    }
}
