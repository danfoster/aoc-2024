import Puzzle from '../../Puzzle';

class Stone {
    data: number;
    next: Stone | undefined;

    constructor(data: number) {
        this.data = data;
        this.next = null;
    }

    step(): Stone {
        if (this.data == 0) {
            this.data = 1;
            return this.next;
        }

        let str_data = this.data.toString();
        let str_len = str_data.length;

        if (str_len % 2 == 0) {
            const data1: number = +str_data.slice(0, str_len / 2);
            const data2: number = +str_data.slice(str_len / 2);
            const newstone = new Stone(data2);
            this.data = data1;
            newstone.next = this.next;
            this.next = newstone;
            return newstone.next;
        }

        this.data = this.data * 2024;
        return this.next;
    }
}

class StoneList {
    head: Stone;
    constructor(head: Stone | undefined = null) {
        this.head = head;
    }

    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }

    toArray() {
        const data = [];
        let node = this.head;
        while (node) {
            data.push(node.data);
            node = node.next;
        }
        return data;
    }

    step(): void {
        let node = this.head;
        while (node) {
            node = node.step();
        }
    }
}

export default class Day11 extends Puzzle {
    day = '11';

    length: number;
    stones: StoneList;

    constructor() {
        super();
    }

    parse(input: string) {
        input = input.replace(/\n$/, '');
        const values = input.split(' ');
        this.stones = new StoneList();
        let prevstone = new Stone(+values[0]);
        this.stones.head = prevstone;
        for (let i = 1; i < values.length; i++) {
            const stone = new Stone(+values[i]);
            prevstone.next = stone;
            prevstone = stone;
        }
    }

    p1(): number | string {
        // console.log(this.stones.toArray().join(' '));
        for (let i = 0; i < 25; i++) {
            this.stones.step();
            // console.log(this.stones.toArray().join(' '));
        }
        return this.stones.size();
    }

    p2(): number | string {
        for (let i = 0; i < 50; i++) {
            this.stones.step();
            // console.log(this.stones.toArray().join(' '));
        }
        return this.stones.size();
    }
}
