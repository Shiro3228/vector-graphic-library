import MaxPointsExceeded from "../errors/maxPointsExceeded.js";
import MinPointsExceeded from "../errors/minPointsExceeded.js";
import type { SymbolPoints } from "../interfaces/isymbol.js";
import type ISymbol from "../interfaces/isymbol.js";
import type Point from "../math/point.js";
import type { ID } from "../types/id.js";

export type BaseSymbolOptions = {
    color?: string | undefined;
    [key: string]: unknown;
};

export default abstract class BaseSymbol<
    TOptions extends BaseSymbolOptions = BaseSymbolOptions,
> implements ISymbol<TOptions>
{
    static id: ID;
    static name: string;
    minPoints: number;
    maxPoints: number;

    abstract options?: TOptions | undefined;
    static defaultOptions?: unknown | undefined;

    get id(): ID {
        return this.id;
    }

    get name(): string {
        return this.name;
    }

    get defaultOptions(): TOptions | undefined {
        return this.defaultOptions;
    }

    points: SymbolPoints;

    constructor(
        points: SymbolPoints,
        options?: TOptions | undefined,
        minPoints: number = 0,
        maxPoints: number = Number.MAX_SAFE_INTEGER,
    ) {
        this.points = [];
        this.minPoints = minPoints;
        this.maxPoints = maxPoints;
        this.update(points, options);
    }

    getCorrectPoints(points: Point[]): Point[] {
        return points;
    }

    update(points?: SymbolPoints, options?: TOptions): void;
    update(i: number, points?: Point[], options?: TOptions): void;
    update(
        arg1?: SymbolPoints | number,
        arg2?: TOptions | Point[],
        arg3?: TOptions,
    ): void {
        if (typeof arg1 !== "number") {
            if (arg1) this.updatePoints(arg1 as SymbolPoints);
            if (arg2) this.updateOptions(arg2 as TOptions);
            return;
        }

        const i = arg1;
        const points = arg2 as Point[] | undefined;
        const options = arg3 as TOptions | undefined;

        if (points) this.updatePoints(i, points);
        if (options) this.updateOptions(options);
    }

    updatePoints(points: SymbolPoints): void;
    updatePoints(i: number, points: Point[]): void;
    updatePoints(arg1: number | SymbolPoints, arg2?: Point[]): void {
        if (arg2) {
            const i = arg1 as number;
            const points = arg2;

            this.updatePointsAt(i, points);
        } else {
            this.updatePointsAll(arg1 as SymbolPoints);
        }
    }

    protected updatePointsAt(i: number, points: Point[]) {
        this.checkMinMaxPoints(points);
        if (!BaseSymbol.isPointsArrayArray(this.points)) return;
        if (!this.points[i]) console.warn("Updating non existing element");
        this.points[i] = this.getCorrectPoints(points);
    }

    protected updatePointsAll(points: SymbolPoints) {
        this.checkMinMaxPoints(points);
        if (!BaseSymbol.isPointsArrayArray(points)) {
            this.points = this.getCorrectPoints(points);
        } else {
            this.points = points.map(e => this.getCorrectPoints(e));
        }
    }

    protected checkMinMaxPoints(points: SymbolPoints) {
        const arr: Point[][] =
            BaseSymbol.isPointsArrayArray(points) ? points : [points];

        arr.forEach(e => {
            if (e.length < this.minPoints)
                throw new MinPointsExceeded({
                    expected: this.maxPoints,
                    actual: e.length,
                });
            if (e.length > this.maxPoints)
                throw new MaxPointsExceeded({
                    expected: this.maxPoints,
                    actual: e.length,
                });
        });
    }

    updateOptions(options?: TOptions): void {
        this.options = options ?? this.defaultOptions;
    }

    resetOptions(): void {
        this.options = this.defaultOptions;
    }

    abstract getSymbol(points: Point[], options?: TOptions): ISymbol<TOptions>;

    abstract normalize(): ISymbol[];

    protected static isPointsArrayArray(
        points: SymbolPoints,
    ): points is Point[][] {
        return Array.isArray(points[0]);
    }
}
