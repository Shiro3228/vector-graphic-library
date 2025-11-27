import type { ID } from "../types/id.js";

export default interface ISymbolInfo {
    readonly id: ID;
    readonly name: string;
    readonly minPoints: number;
    readonly maxPoints: number;
}
