import type ISymbol from "../interfaces/isymbol.js";
import type Point from "../math/point.js";
import BaseSymbol from "./baseSymbol.js";

enum BodyType {
    REGULAR = "REGULAR",
}

type LineOptions = {
    border: BodyType;
};

export default class Line<
    TOptions extends LineOptions = LineOptions,
> extends BaseSymbol<TOptions> {
    static override id = "line";
    static override name: string = "Primitive Line";
    override minPoints: number = 2;
    override maxPoints: number = Number.MAX_SAFE_INTEGER;
    override options?: TOptions;

    constructor(points: Point[], options?: TOptions | undefined) {
        super(points);
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
