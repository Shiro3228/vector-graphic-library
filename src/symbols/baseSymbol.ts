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
    abstract minPoints: number;
    abstract maxPoints: number;

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

    points: Point[];

    constructor(points: Point[]) {
        this.points = this.getCorrectPoints(points);
    }

    getCorrectPoints(points: Point[]): Point[] {
        return points;
    }

    update(points?: Point[], options?: TOptions): void {
        if (points) this.updatePoints(points);
        if (options) this.updateOptions(options);
    }

    updatePoints(points: Point[]): void {
        this.points = this.getCorrectPoints(points);
    }

    updateOptions(options?: TOptions): void {
        this.options = options ?? this.defaultOptions;
    }

    resetOptions(): void {
        this.options = this.defaultOptions;
    }

    abstract getSymbol(points: Point[], options?: TOptions): ISymbol<TOptions>;

    abstract normalize(): ISymbol[];
}
