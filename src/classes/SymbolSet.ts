import type ISymbolSet from "../interfaces/ISymbolSet.js";

export default abstract class SymbolSet implements ISymbolSet{
    abstract id: string;
}