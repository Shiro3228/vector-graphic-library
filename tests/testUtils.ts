import type ISymbolSet from "../src/interfaces/ISymbolSet.js";
import { faker } from '@faker-js/faker';

export class TestUtils{
    static getSymbolSet(): ISymbolSet {
        return {
            id: faker.string.uuid()
        }
    }
}