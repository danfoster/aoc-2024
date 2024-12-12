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
