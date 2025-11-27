import type ISolution from "../interfaces/isolution.js";
import type ISymbolSet from "../interfaces/isymbolSet.js";
import type { ID } from "../types/id.js";

export class Solution implements ISolution {
    private symbolSets: ISymbolSet[] = [];

    addSymbolSet<TOptions extends object>(
        ss: ISymbolSet<TOptions>,
        options?: TOptions,
    ): void {
        if (options) ss.updateOptions(options);

        this.symbolSets.push(ss);
    }

    getSymbolSets(): readonly ISymbolSet[] {
        return [...this.symbolSets];
    }

    getSymbolSet(id: ISymbolSet["id"]): ISymbolSet | undefined {
        return this.symbolSets.find(e => e.id === id);
    }

    updateSymbolSet<TOptions extends object>(
        id: ISymbolSet["id"],
        options: TOptions,
    ): void {
        this.getSymbolSet(id)?.updateOptions(options);
    }

    removeSymbolSet(id: ID): ISymbolSet | undefined {
        const remove = this.getSymbolSet(id);
        if (!remove) return;
        this.symbolSets = this.symbolSets.filter(e => e.id !== id);

        return remove;
    }

    existsSymbolSet(id: ID): boolean {
        return 0 <= this.symbolSets.findIndex(e => e.id === id);
    }
}

export default new Solution();
