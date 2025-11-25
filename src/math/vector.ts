export default class Vector {
    public readonly dx: number;
    public readonly dy: number;

    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }

    scale(sx: number): Vector {
        return new Vector(this.dx * sx, this.dy * sx);
    }

    rotateDeg(deg: number): Vector {
        return this.rotateRad((deg * Math.PI) / 180);
    }

    rotateRad(rad: number): Vector {
        return new Vector(
            this.dx * Math.cos(rad) - this.dy * Math.sin(rad),
            this.dx * Math.sin(rad) + this.dy * Math.cos(rad),
        );
    }

    length(): number {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    withLength(len: number, sx: number = 1): Vector {
        const i = (len / this.length()) * sx;
        return new Vector(this.dx * i, this.dy * i);
    }
}
