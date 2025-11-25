import type ISymbol from "../interfaces/isymbol.js";
import type ISymbolInfo from "../interfaces/isymbolInfo.js";
import type ISymbolSet from "../interfaces/isymbolSet.js";
import type Point from "../../math/point.js";

export default abstract class BaseSymbolSet<TId = string, TSymbolId = string>
    implements ISymbolSet<TId, TSymbolId>
{
    abstract id: TId;
    abstract getSymbolCodes(): TSymbolId[];
    abstract getSymbolInfo(id: TSymbolId): ISymbolInfo<TSymbolId>;
    abstract getSymbol(
        id: TSymbolId,
        points: Point[],
        options?: Record<string, unknown>,
    ): ISymbol<TSymbolId>;
}
