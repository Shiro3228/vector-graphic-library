import SidcAmplifier from "./amplifier.js";
import SidcContext from "./context.js";
import SidcStandardIdentity from "./standardIdentity.js";
import SidcStatus from "./status.js";
import SidcSymbolSet from "./symbolSet.js";
import SidcTaskForce from "./taskForce.js";
import SidcVersion from "./version.js";

export default class Sidc {
    /**
     * Sidc 1st and 2nd digit.
     */
    version: SidcVersion = SidcVersion.APP_6E_1;

    /**
     * Sidc 3rd digit.
     */
    context: SidcContext = SidcContext.REALITY;

    /**
     * Sidc 4th digit.
     */
    identity: SidcStandardIdentity = SidcStandardIdentity.PENDING;

    /**
     * Sidc 5th and 6nd digit.
     */
    symbolSet: SidcSymbolSet = SidcSymbolSet.UNKNOWN;

    /**
     * Sidc 7th digit.
     */
    status: SidcStatus = SidcStatus.PRESENT;

    /**
     * Sidc 8th digit.
     */
    taskForce: SidcTaskForce = SidcTaskForce.NOT_APPLICABLE;

    /**
     * Sidc 9th and 10th digit.
     */
    amplifier: SidcAmplifier = SidcAmplifier.UNKNOWN;

    isValid: boolean;
    code: string;

    static validationRegEx: RegExp = new RegExp("^\\d{20,30}$");

    constructor(code: string | number) {
        this.code = code.toString();
        this.isValid = Sidc.validationRegEx.test(code.toString());
        if (!this.isValid) return;

        this.getVersion();
        this.getContext();
        this.getIdentity();
        this.getSymbolSet();
        this.getStatus();
        this.getTaskForce();
        this.getAmplifier();
    }

    private getVersion() {
        this.version = this.getNumber(0, 2);
    }

    private getContext() {
        this.context = this.getNumber(2, 1);
    }

    private getIdentity() {
        this.identity = this.getNumber(3, 1);
    }

    private getSymbolSet() {
        this.symbolSet = this.getNumber(4, 2);
    }

    private getStatus() {
        this.status = this.getNumber(6, 1);
    }

    private getTaskForce() {
        this.taskForce = this.getNumber(7, 1);
    }

    private getAmplifier() {
        this.amplifier = this.getNumber(8, 2);
    }

    private getNumber(pos: number, len: number) {
        return Number(this.code.slice(pos, pos + len));
    }

    public copy(
        overrides?: Partial<{
            version: SidcVersion;
            context: SidcContext;
            identity: SidcStandardIdentity;
            symbolSet: SidcSymbolSet;
            status: SidcStatus;
            taskForce: SidcTaskForce;
            amplifier: SidcAmplifier;
        }>,
    ) {
        if (!this.isValid || !overrides) return new Sidc(this.code);
        return new Sidc(
            (overrides.version ?? this.version).toString().padStart(2, "0") +
                (overrides.context ?? this.context)
                    .toString()
                    .padStart(1, "0") +
                (overrides.identity ?? this.identity)
                    .toString()
                    .padStart(1, "0") +
                (overrides.symbolSet ?? this.symbolSet)
                    .toString()
                    .padStart(2, "0") +
                (overrides.status ?? this.status).toString().padStart(1, "0") +
                (overrides.taskForce ?? this.taskForce)
                    .toString()
                    .padStart(1, "0") +
                (overrides.amplifier ?? this.amplifier)
                    .toString()
                    .padStart(2, "0") +
                this.code.substring(9),
        );
    }
}
