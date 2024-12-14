import Point from './Point';

export default class PointSet {
    points: Map<number, Map<number, Point>>;

    constructor() {
        this.points = new Map();
    }

    add(p: Point): void {
        if (!this.points.has(p.y)) {
            this.points.set(p.y, new Map());
        }
        if (!this.points.get(p.y).has(p.x)) {
            this.points.get(p.y).set(p.x, p);
        }
    }

    popFirst(): Point | undefined {
        for (const y of this.points.values()) {
            for (const [x, p] of y) {
                y.delete(x);
                return p;
            }
        }
        return null;
    }

    pop(p: Point): Point | undefined {
        if (!this.points.has(p.y)) {
            return null;
        }
        if (!this.points.get(p.y).has(p.x)) {
            return null;
        }
        const p2 = this.points.get(p.y).get(p.x);
        this.points.get(p.y).delete(p.x);
        return p2;
    }

    exists(p: Point): boolean {
        return this.points.has(p.y) && this.points.get(p.y).has(p.x);
    }

    *getAll(): IterableIterator<Point> {
        for (let y of this.points.values()) {
            for (let x of y.values()) {
                yield x;
            }
        }
    }

    size(): number {
        let count = 0;
        for (let y of this.points.values()) {
            count += y.size;
        }
        return count;
    }
}
