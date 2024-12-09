import Puzzle from '../../Puzzle';

class Rule {
    first: number;
    second: number;

    constructor(first: number, second: number) {
        this.first = first;
        this.second = second;
    }
}

class Rules {
    rules: Map<number, number[]>;

    constructor() {
        this.rules = new Map();
    }

    add(a: number, b: number) {
        if (!this.rules.has(a)) {
            this.rules.set(a, []);
        }
        this.rules.get(a).push(b);
    }

    ruleExists(a: number, b: number) {
        return this.rules.has(a) && this.rules.get(a).indexOf(b) != -1;
    }
}

class Update {
    pages: number[];
    middle_idx: number;

    constructor(pages: string) {
        this.pages = pages.split(',').map(Number);
        this.middle_idx = (this.pages.length - 1) / 2;
    }

    isValid(rules: Rules): boolean {
        for (let left of rules.rules.keys()) {
            const idx = this.pages.indexOf(left);
            if (idx != -1) {
                const leftPages = this.pages.slice(0, idx);
                for (let right of rules.rules.get(left)) {
                    if (leftPages.indexOf(right) != -1) {
                        return false;
                    }
                }
                // console.log(rule.first + ': ' + leftPages + ' (' + idx + ')');
            }
        }
        return true;
    }

    getMiddle(): number {
        return this.pages[this.middle_idx];
    }

    sort(rules: Rules): void {
        this.pages.sort(function (a, b) {
            if (rules.ruleExists(a, b)) {
                return 1;
            } else if (rules.ruleExists(b, a)) {
                return -1;
            } else {
                return 0;
            }
        });
    }
}

export default class Day5 extends Puzzle {
    day = '5';

    length: number;
    rules: Rules;
    updates: Update[];

    constructor() {
        super();
        this.rules = new Rules();
        this.updates = new Array();
    }

    parse(input: string) {
        const lines = input.split('\n');

        let i = 0;
        for (; lines[i] != ''; i++) {
            const [f, s] = lines[i].split('|');
            this.rules.add(+f, +s);
        }
        i++;
        for (; i < lines.length; i++) {
            this.updates.push(new Update(lines[i]));
        }
    }

    p1(): number | string {
        var result: number = 0;
        for (const update of this.updates) {
            if (update.isValid(this.rules)) {
                result += update.getMiddle();
            }
        }
        return result;
    }

    p2(): number | string {
        var result: number = 0;
        for (const update of this.updates) {
            if (!update.isValid(this.rules)) {
                update.sort(this.rules);
                result += update.getMiddle();
            }
        }
        return result;
    }
}

if (require.main === module) {
    const puzzle = new Day5();
    puzzle.solve();
}
