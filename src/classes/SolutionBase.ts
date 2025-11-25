import type ISymbolSet from "../interfaces/ISymbolSet.js";

let symbolSets: ISymbolSet[] = [];

export function addSymbolSet(ss: ISymbolSet){
    symbolSets.push(ss);
}

export function getSymbolSets(): readonly ISymbolSet[]{
    return symbolSets;
}

export function removeSymbolSet(id: string){
    if(symbolSets.length === 0) return;
    symbolSets = symbolSets.filter(e => e.id !== id);
}