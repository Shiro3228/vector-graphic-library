import type Point from "../math/point.js";
import type IOptionable from "./ioptionable.js";
import type ISymbolInfo from "./isymbolInfo.js";

export default interface ISymbol<TOptions extends object = object>
    extends ISymbolInfo,
        IOptionable<TOptions> {
    points: Point[];

    getCorrectPoints(points: Point[]): Point[];

    update(points?: Point[], options?: TOptions): void;
    updatePoints(points: Point[]): void;

    normalize(): ISymbol[];

    getSymbol(points: Point[], options?: TOptions): ISymbol<TOptions>;
}
