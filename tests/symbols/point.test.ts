import { describe, it, expect } from "vitest";
import MathPoint from "../../src/math/point.js";
import SymbolPoint from "../../src/symbols/point.js";

describe("Point Symbol", () => {
    const p0 = new MathPoint(0, 0);

    it("creates a Point with no options", () => {
        const sym = new SymbolPoint([p0]);

        expect(sym).toBeInstanceOf(SymbolPoint);
        expect(sym.points).toEqual([p0]);
        expect(sym.options).toBeUndefined();
        expect(sym.minPoints).toBe(1);
        expect(sym.maxPoints).toBe(1);
        expect(SymbolPoint.id).toBeTypeOf("string");
        expect(SymbolPoint.name).toBeTypeOf("string");
    });

    it("creates a Point with options", () => {
        const options = { foo: 123 };
        const sym = new SymbolPoint([p0], options);

        expect(sym.options).toEqual(options);
    });

    it("static getSymbol() creates a new Point", () => {
        const options = { bar: true };
        const sym = SymbolPoint.getSymbol([p0], options);

        expect(sym).toBeInstanceOf(SymbolPoint);
        expect(sym.points).toEqual([p0]);
        expect(sym.options).toEqual(options);
    });

    it("static getSymbol() creates a Point without options", () => {
        const sym = SymbolPoint.getSymbol([p0]);

        expect(sym).toBeInstanceOf(SymbolPoint);
        expect(sym.points).toEqual([p0]);
        expect(sym.options).toBeUndefined();
    });

    it("instance getSymbol() delegates to static getSymbol()", () => {
        const base = new SymbolPoint([p0]);
        const sym = base.getSymbol([p0], { color: "red" });

        expect(sym).toBeInstanceOf(SymbolPoint);
        expect(sym.points).toEqual([p0]);
        expect(sym.options).toEqual({ color: "red" });
    });

    it("normalize() returns an array containing itself", () => {
        const sym = new SymbolPoint([p0]);
        const result = sym.normalize();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(sym);
    });
});
