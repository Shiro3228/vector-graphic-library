import type { ID } from "../../types/id.js";
import type ISymbolInfo from "../interfaces/isymbolInfo.js";

export default abstract class BaseSymbolInfo implements ISymbolInfo {
    static defaultOptions: Record<string, unknown> = {};

    abstract readonly id: ID;
    abstract readonly name: string;
    abstract readonly minPoints: number;
    abstract readonly maxPoints: number;

    get defaultOptions(): Record<string, unknown> {
        return (this.constructor as typeof BaseSymbolInfo).defaultOptions;
    }
}
