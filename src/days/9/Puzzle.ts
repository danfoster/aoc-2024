import Puzzle from '../../Puzzle';

type Datablock = {
    pos: number;
    size: number;
    value: number;
};

type Freeblock = {
    pos: number;
    size: number;
};

export default class Day9 extends Puzzle {
    day = '9';

    disk: number[];
    datablocks: Datablock[];
    freeblocks: Freeblock[];

    constructor() {
        super();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        let data: boolean = true;
        this.disk = [];
        this.datablocks = [];
        this.freeblocks = [];
        let i = 0;
        let pos = 0;
        for (let n = 0; n < input.length; n++) {
            const c = +input[n];
            if (data) {
                this.datablocks.push({ pos: pos, size: c, value: i });
                const block = Array(c).fill(i);
                this.disk.push(...block);
                i++;
            } else if (c > 0) {
                this.freeblocks.push({ pos: pos, size: c });
                const block = Array(c).fill(-1);
                this.disk.push(...block);
            }
            pos += c;
            data = !data;
        }
    }

    draw() {
        const line = [];
        for (const c of this.disk) {
            if (c != -1) {
                line.push(c.toString());
            } else {
                line.push('.');
            }
        }
        console.log(line.join(''));
    }

    drawv2() {
        const line = [];
        for (let i = 0; i < this.disk.length; ) {
            let found = false;
            for (const db of this.datablocks) {
                if (db.pos == i) {
                    const block = Array(db.size).fill(db.value);
                    line.push(...block);
                    i += db.size;
                    found = true;
                }
            }
            for (const fb of this.freeblocks) {
                if (fb.pos == i) {
                    const block = Array(fb.size).fill('.');
                    line.push(...block);
                    i += fb.size;
                    found = true;
                }
            }
            if (!found) {
                line.push('?');
                i++;
            }
        }

        console.log(line.join(''));
    }

    sum(upto: number): number {
        let total = 0;
        for (let i = 0; i < upto; i++) {
            total += i * this.disk[i];
        }
        return total;
    }

    sumv2(): number {
        let total = 0;
        for (const db of this.datablocks) {
            for (let i = 0; i < db.size; i++) {
                total += (db.pos + i) * db.value;
            }
        }
        return total;
    }

    p1(): number | string {
        let a = 0;
        let b = this.disk.length - 1;
        while (a <= b) {
            if (this.disk[a] != -1) {
                a++;
            } else if (this.disk[b] == -1) {
                b--;
            } else {
                this.disk[a] = this.disk[b];
                // this.disk[b] = -1;
                a++;
                b--;
            }
        }

        return this.sum(a);
    }

    sortAndCompactFreeBlocks() {
        for (let i = 1; i < this.freeblocks.length; i++) {
            const fb = this.freeblocks[i];
            const prev_fb = this.freeblocks[i - 1];

            if (prev_fb.pos + prev_fb.size == fb.size) {
                fb.pos = prev_fb.pos;
                fb.size += prev_fb.size;
                prev_fb.size = 0;
                prev_fb.pos = -1;
            }
        }
    }
    p2(): number | string {
        // console.log(this.datablocks);
        // console.log(this.freeblocks);
        // this.drawv2();

        for (let i = this.datablocks.length - 1; i >= 0; i--) {
            const db = this.datablocks[i];
            // console.log(`Considering ${db.value}`);
            for (let j = 0; j < this.freeblocks.length; j++) {
                const fb = this.freeblocks[j];
                if (db.size <= fb.size) {
                    if (db.pos > fb.pos) {
                        // console.log(
                        //     `Moving  ${db.value} from ${db.pos} to ${fb.pos}`
                        // );
                        this.freeblocks.push({ pos: db.pos, size: db.size });
                        db.pos = fb.pos;
                        fb.pos += db.size;
                        fb.size -= db.size;
                        if (fb.size <= 0) {
                            this.freeblocks.splice(j, 1);
                        }
                        this.sortAndCompactFreeBlocks();
                        break;
                    }
                }
            }
        }
        return this.sumv2();
    }
}
