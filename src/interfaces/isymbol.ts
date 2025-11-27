import type Point from "../math/point.js";
import type IOptionable from "./ioptionable.js";
import type ISymbolInfo from "./isymbolInfo.js";

export type SymbolPoints = Point[] | Point[][];

export default interface ISymbol<TOptions extends object = object>
    extends ISymbolInfo,
        IOptionable<TOptions> {
    points: SymbolPoints;

    getCorrectPoints(points: Point[]): Point[];

    update(points?: SymbolPoints, options?: TOptions): void;
    update(i: number, points?: Point[], options?: TOptions): void;
    updatePoints(points: SymbolPoints): void;
    updatePoints(i: number, points: Point[]): void;

    normalize(): ISymbol[];

    getSymbol(points: SymbolPoints, options?: TOptions): ISymbol<TOptions>;
}
