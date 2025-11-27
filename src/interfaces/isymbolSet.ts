import type Point from "../math/point.js";
import type { ID } from "../types/id.js";
import type IOptionable from "./ioptionable.js";
import type ISymbol from "./isymbol.js";
import type ISymbolInfo from "./isymbolInfo.js";

export default interface ISymbolSet<TOptions extends object = object>
    extends IOptionable<TOptions> {
    readonly id: ID;

    getSymbolInfos(): ISymbolInfo[];
    getSymbolInfo(id: ID): ISymbolInfo | undefined;
    getSymbol<TSymbolOptions extends object>(
        id: ID,
        points: Point[],
        options?: TSymbolOptions,
    ): ISymbol<TSymbolOptions> | undefined;
}
