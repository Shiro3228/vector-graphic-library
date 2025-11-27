export default interface IOptionable<TOptions extends object = object> {
    options?: TOptions | undefined;
    defaultOptions?: TOptions | undefined;

    updateOptions(options?: TOptions): void;
    resetOptions(): void;
}
