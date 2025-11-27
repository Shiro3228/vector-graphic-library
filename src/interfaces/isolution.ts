import type ISymbolSet from "./isymbolSet.js";

export default interface ISolution {
    addSymbolSet<ISSOptions extends object>(
        set: ISymbolSet<ISSOptions>,
        options?: ISSOptions,
    ): void;

    getSymbolSets(): readonly ISymbolSet[];
    getSymbolSet(id: ISymbolSet["id"]): ISymbolSet | undefined;
    existsSymbolSet(id: ISymbolSet["id"]): boolean;

    updateSymbolSet<ISSOptions extends object>(
        id: ISymbolSet["id"],
        options: ISSOptions,
    ): void;

    removeSymbolSet(id: ISymbolSet["id"]): ISymbolSet | undefined;
}
