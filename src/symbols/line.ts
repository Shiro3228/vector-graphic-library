import type { SymbolPoints } from "../interfaces/isymbol.js";
import type ISymbol from "../interfaces/isymbol.js";
import type Point from "../math/point.js";
import BaseSymbol, { type BaseSymbolOptions } from "./baseSymbol.js";

export interface BodyTypeMap {
    REGULAR: "REGULAR";
    DASHED: "DASHED";
}

export const BodyType: BodyTypeMap = {
    REGULAR: "REGULAR",
    DASHED: "DASHED",
};

export type BodyType = BodyTypeMap[keyof BodyTypeMap];

export type LineOptions = BaseSymbolOptions & {
    border: BodyType;
};

export default class Line<
    TOptions extends LineOptions = LineOptions,
> extends BaseSymbol<TOptions> {
    static override id = "line";
    static override name: string = "Primitive Line";
    override options?: TOptions;

    constructor(points: SymbolPoints, options?: TOptions | undefined) {
        super(points, options, 2, Number.MAX_SAFE_INTEGER);
        if (options) this.options = options;
        else delete this.options;
    }

    override getSymbol(
        points: Point[],
        options?: TOptions | undefined,
    ): ISymbol<TOptions> {
        return Line.getSymbol(points, options);
    }

    override normalize(): ISymbol[] {
        return [this];
    }

    static getSymbol<TOptions extends LineOptions = LineOptions>(
        points: Point[],
        options?: TOptions | undefined,
    ): ISymbol<TOptions> {
        return new Line(points, options);
    }
}
