export default class MaxPointsExceeded extends Error {
    constructor(msg: string | { expected: number; actual: number }) {
        const message =
            typeof msg === "string" ? msg : (
                `Passed: ${msg.actual}\nAllowed: ${msg.expected}`
            );

        super(message);
        this.name = "MaxPointsExceeded";
    }
}
