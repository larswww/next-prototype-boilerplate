export interface canary {
    /**
     * A helpful message that will be added as description in the generated JSON schema.
     *
     * @minLength 4
     * @maxLength 99
     */
    message: string,
    /**
     * @minimum 42
     * @maximum 69
     */
    meaning: number
}

export const fixture: canary = {
    message: 'Hello from Mock API with MSW.js',
    meaning: 42,
}
