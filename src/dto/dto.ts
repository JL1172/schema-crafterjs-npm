type OptionsType = {
    required: boolean;
    min: number;
    max: number;
    matches: RegExp | null;
    string: boolean;
    number: boolean;
    boolean: boolean;
    date: boolean;
}
module.exports = OptionsType;