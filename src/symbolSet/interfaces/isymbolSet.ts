import type Point from "../../math/point.js";
import type { ID } from "../../types/id.js";
import type ISymbol from "./isymbol.js";
import type ISymbolInfo from "./isymbolInfo.js";

export default interface ISymbolSet {
    readonly id: ID;
    getSymbolCodes(): ID[];
    getSymbolInfo(id: ID): ISymbolInfo;
    getSymbol(
        id: ID,
        points: Point[],
        options?: Record<string, unknown>,
    ): ISymbol;
}
