/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import Sidc from "../../../src/app_6e/sidc/sidc.js";
import SidcVersion from "../../../src/app_6e/sidc/version.js";
import SidcContext from "../../../src/app_6e/sidc/context.js";
import SidcStandardIdentity from "../../../src/app_6e/sidc/standardIdentity.js";
import type { NonFunctionPropertyNames } from "../../utils/helpers.js";
import SidcSymbolSet from "../../../src/app_6e/sidc/symbolSet.js";
import SidcStatus from "../../../src/app_6e/sidc/status.js";
import SidcTaskForce from "../../../src/app_6e/sidc/taskForce.js";
import SidcAmplifier from "../../../src/app_6e/sidc/amplifier.js";

describe("class Sidc", () => {
    const sidc = new Sidc("10031000001211000000");

    it("can be constructed", () => {
        expect(sidc).toBeInstanceOf(Sidc);
        expect(sidc.isValid).toBeTruthy();
        expect(sidc.version).toBe(10);
        expect(sidc.context).toBe(0);
        expect(sidc.identity).toBe(3);
        expect(sidc.symbolSet).toBe(10);
        expect(sidc.status).toBe(0);
        expect(sidc.taskForce).toBe(0);
        expect(sidc.amplifier).toBe(0);
    });

    describe("copy", () => {
        describe("works with new", () => {
            const checkFunck = <T extends NonFunctionPropertyNames<Sidc>>(
                key: T,
                change: Sidc[T],
                codeCheck: (arg: string) => boolean,
            ) => {
                const uut = sidc.copy({ [key]: change });

                const { [key]: _1, code: _c1, ...actualRest } = uut;
                const { [key]: _2, code: _c2, ...expectedRest } = sidc;

                expect(uut).not.toBe(sidc);
                expect(uut[key]).toBe(change);
                expect(sidc[key]).not.toBe(uut[key]);
                if (sidc.isValid) expect(codeCheck(uut.code)).toBe(true);
                expect(actualRest).toEqual(expectedRest);
            };

            it("version", () => {
                checkFunck(
                    "version",
                    14,
                    code => code.substring(0, 2) === "14",
                );
            });

            it("context", () => {
                checkFunck(
                    "context",
                    SidcContext.RESTRICTED_TARGET_SIMULATION,
                    code => code.substring(2, 3) === "7",
                );
            });

            it("identity", () => {
                checkFunck(
                    "identity",
                    SidcStandardIdentity.HOSTILE_OR_FAKER,
                    code => code.substring(3, 4) === "6",
                );
            });

            it("symbolSet", () => {
                checkFunck(
                    "symbolSet",
                    SidcSymbolSet.CYBERSPACE_LAND_UNIT,
                    code => code.substring(4, 6) === "63",
                );
            });

            it("status", () => {
                checkFunck(
                    "status",
                    SidcStatus.PRESENT_OR_DESTROYED,
                    code => code.substring(6, 7) === "4",
                );
            });

            it("taskForce", () => {
                checkFunck(
                    "taskForce",
                    SidcTaskForce.FEINT_OR_DUMMY_HEADQUARTERS,
                    code => code.substring(7, 8) === "3",
                );
            });

            it("amplifier", () => {
                checkFunck(
                    "amplifier",
                    SidcAmplifier.BARGE,
                    code => code.substring(8, 10) === "51",
                );
            });
        });
    });
});
