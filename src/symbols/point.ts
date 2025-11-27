import type ISymbol from "../interfaces/isymbol.js";
import { default as MathPoint } from "../math/point.js";
import type { ID } from "../types/id.js";
import BaseSymbol from "./baseSymbol.js";

type PointOptions = object;

export default class Point<
    TOptions extends PointOptions = PointOptions,
> extends BaseSymbol<TOptions> {
    static override id: ID = "point";
    static override name: string = "Primitive Point";
    override minPoints: number = 1;
    override maxPoints: number = 1;
    override options?: TOptions;

    constructor(points: MathPoint[], options?: TOptions | undefined) {
        super(points);
        if (options) this.options = options;
        else delete this.options;
    }

    override getSymbol(
        points: MathPoint[],
        options?: TOptions | undefined,
    ): ISymbol<TOptions> {
        return Point.getSymbol(points, options);
    }

    override normalize(): ISymbol[] {
        return [this];
    }

    static getSymbol<TOptions extends PointOptions = PointOptions>(
        points: MathPoint[],
        options?: TOptions | undefined,
    ): ISymbol<TOptions> {
        return new Point(points, options);
    }
}
