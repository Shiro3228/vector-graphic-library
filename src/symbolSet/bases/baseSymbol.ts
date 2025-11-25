import type Point from "../../math/point.js";
import type ISymbol from "../interfaces/isymbol.js";
import BaseSymbolInfo from "./baseSymbolInfo.js";

export default abstract class BaseSymbol
    extends BaseSymbolInfo
    implements ISymbol
{
    points: Point[];
    options: Record<string, unknown>;

    constructor(points: Point[], options?: Record<string, unknown>) {
        super();
        this.points = points;
        this.options = options ?? this.defaultOptions;
    }
}
