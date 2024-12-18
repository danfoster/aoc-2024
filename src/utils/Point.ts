export default class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(value: Point): void {
        this.x += value.x;
        this.y += value.y;
    }

    set(value: Point): void {
        this.x = value.x;
        this.y = value.y;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    toString() {
        return `[${this.x},${this.y}]`;
    }
}
