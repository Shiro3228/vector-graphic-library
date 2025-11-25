import type Point from "../../math/point.js";
import type ISymbolInfo from "./isymbolInfo.js";

export default interface ISymbol extends ISymbolInfo {
    points: Point[];
    options: Record<string, unknown>;
}
