import { describe, it, expect } from "vitest";
import Point from "../../src/math/point.js";
import Line, { BodyType } from "../../src/symbols/line.js";

describe("Line Symbol", () => {
    const p0 = new Point(0, 0);
    const p1 = new Point(1, 1);
    const p2 = new Point(2, 2);

    it("creates a Line without options", () => {
        const line = new Line([p0, p1]);

        expect(line).toBeInstanceOf(Line);
        expect(line.points).toEqual([p0, p1]);
        expect(line.options).toBeUndefined();
        expect(line.minPoints).toBe(2);
        expect(line.maxPoints).toBe(Number.MAX_SAFE_INTEGER);
        expect(Line.id).toBeTypeOf("string");
        expect(Line.name).toBeTypeOf("string");
    });

    it("creates a Line with options", () => {
        const opts = { border: BodyType.REGULAR };
        const line = new Line([p0, p1], opts);

        console.log(line.options);
        expect(line.options).toEqual(opts);
    });

    // ----------------------------------
    // STATIC getSymbol
    // ----------------------------------
    it("static getSymbol() creates a new Line", () => {
        const opts = { border: BodyType.REGULAR };
        const line = Line.getSymbol([p0, p1], opts);

        expect(line).toBeInstanceOf(Line);
        expect(line.points).toEqual([p0, p1]);
        expect(line.options).toEqual(opts);
    });

    it("static getSymbol() creates a Line without options", () => {
        const line = Line.getSymbol([p0, p1]);

        expect(line).toBeInstanceOf(Line);
        expect(line.options).toBeUndefined();
    });

    // ----------------------------------
    // INSTANCE getSymbol
    // ----------------------------------
    it("instance getSymbol() delegates to static getSymbol()", () => {
        const base = new Line([p0, p1]);
        const line = base.getSymbol([p1, p2], { border: BodyType.REGULAR });

        expect(line).toBeInstanceOf(Line);
        expect(line.points).toEqual([p1, p2]);
        expect(line.options).toEqual({ border: BodyType.REGULAR });
    });

    // ----------------------------------
    // GENERIC TYPING
    // ----------------------------------
    it("preserves generic options through getSymbol()", () => {
        interface CustomOptions {
            border: BodyType;
            thickness: number;
        }

        const line = Line.getSymbol<CustomOptions>([p0, p1], {
            border: BodyType.REGULAR,
            thickness: 5,
        });

        // runtime
        expect(line.options).toEqual({
            border: BodyType.REGULAR,
            thickness: 5,
        });

        // compile-time type check
        const typed: ISymbol<CustomOptions> = line;
        expect(typed.options?.thickness).toBe(5);
    });

    // ----------------------------------
    // NORMALIZE
    // ----------------------------------
    it("normalize() returns an array containing itself", () => {
        const line = new Line([p0, p1]);
        const result = line.normalize();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(line);
    });

    it("does not allow construction with fewer than minPoints", () => {
        // BaseSymbol may enforce this — if not, update accordingly.
        const create = () => new Line([p0]);
        expect(create).toThrowError();
    });

    it("allows very large number of points up to maxPoints", () => {
        const manyPoints = Array.from(
            { length: 1000 },
            (_, i) => new Point(i, i),
        );
        const line = new Line(manyPoints, { border: BodyType.REGULAR });

        expect(line.points.length).toBe(1000);
    });
});
