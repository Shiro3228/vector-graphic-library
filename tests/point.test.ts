import { describe, expect, it, vi } from "vitest";
import Point from "../src/math/point.js";
import Vector from "../src/math/vector.js";

describe("Point", () => {
    it("stores x and y", () => {
        const p = new Point(3, 7);
        expect(p.x).toBe(3);
        expect(p.y).toBe(7);
    });

    describe("equals()", () => {
        it("static method works", () => {
            const p1 = new Point(3, 7);
            const p2 = new Point(3, 7);
            expect(Point.equals(p1, p2)).toBe(true);
            expect(p1 === p2).toBeFalsy();
        });

        it("works", () => {
            const p1 = new Point(3, 7);
            const p2 = new Point(3, 7);
            expect(p1.equals(p2)).toBe(true);
            expect(p1 === p2).toBeFalsy();
        });

        it("calls static method", () => {
            const p1 = new Point(3, 7);
            const p2 = new Point(3, 7);
            const spy = vi.spyOn(Point, "equals");

            p1.equals(p2);
            expect(spy).toHaveBeenCalledOnce();
            p1.equals(p2);
            expect(spy).toHaveBeenCalledTimes(2);
            Point.equals(p1, p2);
            expect(spy).toHaveBeenCalledTimes(3);
        });
    });

    describe("to()", () => {
        it("creates a vector pointing to target", () => {
            const p1 = new Point(0, 0);
            const p2 = new Point(4, 3);

            const v = p1.to(p2);

            expect(v).toBeInstanceOf(Vector);
            expect(v.dx).toBe(4);
            expect(v.dy).toBe(3);
        });

        it("applies scale correctly", () => {
            const p1 = new Point(1, 1);
            const p2 = new Point(5, 5);
            const v = p1.to(p2, 0.5);

            // (5 - 1) * 0.5
            expect(v.dx).toBe(2);
            expect(v.dy).toBe(2);
        });
    });

    describe("towards()", () => {
        it("returns a point halfway by default", () => {
            const p1 = new Point(0, 0);
            const p2 = new Point(4, 4);

            const p = p1.towards(p2);

            expect(p).toBeInstanceOf(Point);
            expect(p.x).toBe(4);
            expect(p.y).toBe(4);
        });

        it("returns a point at arbitrary factor", () => {
            const p1 = new Point(10, 10);
            const p2 = new Point(20, 30);

            const p = p1.towards(p2, 0.25);

            expect(p.x).toBe(12.5);
            expect(p.y).toBe(15);
        });
    });

    describe("translate()", () => {
        it("returns translated point", () => {
            const p = new Point(3, 4);
            const v = new Vector(10, -2);

            const p2 = p.translate(v);

            expect(p2).toBeInstanceOf(Point);
            expect(p2.x).toBe(13);
            expect(p2.y).toBe(2);
        });

        it("applies scale correctly", () => {
            const p = new Point(0, 0);
            const v = new Vector(4, 6);

            const p2 = p.translate(v, 0.5);

            expect(p2.x).toBe(2);
            expect(p2.y).toBe(3);
        });
    });
});
