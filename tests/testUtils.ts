import Point from "../src/math/point.js";
import type ISymbol from "../src/symbolSet/interfaces/isymbol.js";
import type ISymbolInfo from "../src/symbolSet/interfaces/isymbolInfo.js";
import type ISymbolSet from "../src/symbolSet/interfaces/isymbolSet.js";
import { faker } from "@faker-js/faker";
import type { ID } from "../src/types/id.js";
import type BaseSymbol from "../src/symbolSet/bases/baseSymbol.js";
import type BaseSymbolInfo from "../src/symbolSet/bases/baseSymbolInfo.js";

type ClassAsParams<T extends abstract new (...args: never) => unknown> = Expand<
    Partial<InstanceType<T>>
>;
type Lenght = number | [number, number];
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export class TestUtils {
    private static generateMultiple<T>(
        mapfn: (v: unknown, k: number) => T,
        len?: Lenght,
    ) {
        return Array.from(
            {
                length:
                    len ?
                        typeof len === "number" ?
                            len
                        :   faker.number.int({ min: len[0], max: len[1] })
                    :   faker.number.int({ min: 5, max: 20 }),
            },
            mapfn,
        );
    }

    static getPoint(params?: ClassAsParams<typeof Point>) {
        return new Point(
            params?.x ?? faker.number.int(),
            params?.y ?? faker.number.int(),
        );
    }

    static getSymbol(params?: ClassAsParams<typeof BaseSymbol>): ISymbol {
        return {
            points: this.generateMultiple(() => this.getPoint()),
            options: {},
            ...this.getSymbolInfo(params),
            ...params,
        };
    }

    static getSymbolInfo(
        params?: ClassAsParams<typeof BaseSymbolInfo>,
    ): ISymbolInfo {
        return {
            id: faker.string.uuid(),
            name: faker.lorem.words(10),
            minPoints: faker.number.int(100),
            maxPoints: faker.number.int({ min: 100 }),
            defaultOptions: {},
            ...params,
        };
    }

    static getSymbolSet(): ISymbolSet {
        return {
            id: faker.string.uuid(),
            getSymbolCodes: function (): string[] {
                return TestUtils.generateMultiple(() =>
                    faker.string.numeric(6),
                );
            },
            getSymbolInfo: (id?: ID): ISymbolInfo =>
                this.getSymbolInfo({ id: id ?? faker.string.uuid() }),
            getSymbol: (
                id: ID,
                points: Point[],
                options?: Record<string, unknown>,
            ): ISymbol =>
                this.getSymbol({ id, points, ...[options ?? undefined] }),
        };
    }
}
