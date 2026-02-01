import { describe, expect, it, vi } from "vitest";
import Point from "../src/math/point.js";
import Vector from "../src/math/vector.js";
import { faker } from "@faker-js/faker";

const randNum = () =>
    faker.number.int({
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
    });

const randPoint = () => new Point(randNum(), randNum());
const randVector = () => new Vector(randNum(), randNum());

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
            const p1 = randPoint();
            const p2 = randPoint();

            const v = p1.to(p2);

            expect(v).toBeInstanceOf(Vector);
            expect(v.dx).toBe(p2.x - p1.x);
            expect(v.dy).toBe(p2.y - p1.y);
        });

        it("applies scale correctly", () => {
            const p1 = randPoint();
            const p2 = randPoint();
            const scale = 0.5;
            const v = p1.to(p2, scale);

            expect(v.dx).toBe((p2.x - p1.x) * scale);
            expect(v.dy).toBe((p2.y - p1.y) * scale);
        });
    });

    describe("towards()", () => {
        it("returns an end point by default", () => {
            const p1 = randPoint();
            const p2 = randPoint();

            const p = p1.towards(p2);

            expect(p).toBeInstanceOf(Point);
            expect(p.x).toBe(p2.x);
            expect(p.y).toBe(p2.y);
        });

        it("returns a point at arbitrary factor", () => {
            const p1 = randPoint();
            const p2 = randPoint();

            const scale = 0.25;
            const p = p1.towards(p2, scale);

            expect(p.x).toBe(p1.x + (p2.x - p1.x) * scale);
            expect(p.y).toBe(p1.y + (p2.y - p1.y) * scale);
        });
    });

    describe("translate()", () => {
        it("returns translated point", () => {
            const p = randPoint();
            const v = randVector();

            const p2 = p.translate(v);

            expect(p2).toBeInstanceOf(Point);
            expect(p2.x).toBe(p.x + v.dx);
            expect(p2.y).toBe(p.y + v.dy);
        });

        it("applies scale correctly", () => {
            const p = randPoint();
            const v = randVector();

            const scale = 0.5;
            const p2 = p.translate(v, scale);

            expect(p2.x).toBe(p.x + v.dx * scale);
            expect(p2.y).toBe(p.y + v.dy * scale);
        });
    });
});
