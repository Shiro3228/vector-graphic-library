import Vector from "./vector.js";

export default class Point {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public to(point: Point, scale: number = 1.0): Vector {
        const dx = point.x - this.x;
        const dy = point.y - this.y;
        return new Vector(dx * scale, dy * scale);
    }

    public towards(point: Point, factor: number = 1.0): Point {
        const dx = point.x - this.x;
        const dy = point.y - this.y;
        return new Point(this.x + dx * factor, this.y + dy * factor);
    }

    public translate(vec: Vector, scale: number = 1.0): Point {
        return new Point(this.x + vec.dx * scale, this.y + vec.dy * scale);
    }

    public static equals(a: Point, b: Point): boolean {
        return a.x === b.x && a.y === b.y;
    }
    public equals(other: Point): boolean {
        return Point.equals(this, other);
    }
}
