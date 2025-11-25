import type ISymbolSet from "../symbolSet/interfaces/isymbolSet.js";
import type { ID } from "../types/id.js";

let symbolSets: ISymbolSet[] = [];

export class Solution {
    static addSymbolSet(ss: ISymbolSet) {
        symbolSets.push(ss);
    }

    static getSymbolSets(): readonly ISymbolSet[] {
        return [...symbolSets];
    }

    static removeSymbolSet(id: ID): ISymbolSet | undefined {
        const i = this.existsSymbolSet(id);
        if (i === undefined) return;

        const removed = symbolSets[i];
        symbolSets = symbolSets.filter(e => e.id !== id);

        return removed;
    }

    static existsSymbolSet(id: ID): number | undefined {
        const i = symbolSets.findIndex(e => e.id === id);
        return i < 0 ? undefined : i;
    }

    static getSymbolCodes(id?: ID): ID[] | undefined {
        if (id) return symbolSets.find(e => e.id === id)?.getSymbolCodes();
        return symbolSets.flatMap(e => e.getSymbolCodes());
    }
}

export default Solution;
