import { describe, it, expect } from "vitest";
import Vector from "../src/math/vector.js";

describe("Vector", () => {
    it("stores dx and dy", () => {
        const v = new Vector(3, -2);
        expect(v.dx).toBe(3);
        expect(v.dy).toBe(-2);
    });

    describe("scale()", () => {
        it("scales vector by factor", () => {
            const v = new Vector(2, 4).scale(0.5);
            expect(v.dx).toBe(1);
            expect(v.dy).toBe(2);
        });

        it("scales by negative factor", () => {
            const v = new Vector(3, -3).scale(-2);
            expect(v.dx).toBe(-6);
            expect(v.dy).toBe(6);
        });
    });

    describe("rotateRad()", () => {
        it("rotates 90° (pi/2 rad) correctly", () => {
            const v = new Vector(1, 0).rotateRad(Math.PI / 2);
            expect(v.dx).toBeCloseTo(0);
            expect(v.dy).toBeCloseTo(1);
        });

        it("rotates 180° (pi rad) correctly", () => {
            const v = new Vector(1, 0).rotateRad(Math.PI);
            expect(v.dx).toBeCloseTo(-1);
            expect(v.dy).toBeCloseTo(0);
        });
    });

    describe("rotateDeg()", () => {
        it("rotates vector using degrees", () => {
            const v = new Vector(0, 1).rotateDeg(90);
            expect(v.dx).toBeCloseTo(-1);
            expect(v.dy).toBeCloseTo(0);
        });

        it("handles negative degrees", () => {
            const v = new Vector(1, 0).rotateDeg(-90);
            expect(v.dx).toBeCloseTo(0);
            expect(v.dy).toBeCloseTo(-1);
        });
    });

    describe("length()", () => {
        it("computes vector length", () => {
            const v = new Vector(3, 4);
            expect(v.length()).toBe(5);
        });

        it("handles zero vector", () => {
            const v = new Vector(0, 0);
            expect(v.length()).toBe(0);
        });
    });

    describe("withLength()", () => {
        it("changes vector to given length", () => {
            const v = new Vector(3, 4).withLength(10);
            expect(v.length()).toBeCloseTo(10);
        });

        it("applies scale factor", () => {
            const v = new Vector(3, 4).withLength(10, 0.5);
            expect(v.length()).toBeCloseTo(5);
        });

        it("keeps direction", () => {
            const base = new Vector(3, 4);
            const v = base.withLength(20);

            expect(v.dx / v.dy).toBeCloseTo(base.dx / base.dy);
        });

        it("handles negative resulting length via sx", () => {
            const v = new Vector(1, 0).withLength(5, -1);
            expect(v.dx).toBeCloseTo(-5);
            expect(v.dy).toBeCloseTo(0);
        });
    });
});
