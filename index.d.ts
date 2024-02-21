type ArrayBooleanType = [boolean, string];
type ArrayNumberType = [number, string];
type ArrayRegExpType = [boolean, RegExp, string];
interface FieldOptions {
    required?: ArrayBooleanType;
    min?: ArrayNumberType;
    max?: ArrayNumberType;
    matches?: ArrayRegExpType;
    string?: ArrayBooleanType;
    number?: ArrayBooleanType;
    boolean?: ArrayBooleanType;
    date?: ArrayBooleanType;
    email?: ArrayBooleanType;
    password?: ArrayBooleanType;
}
type FieldType = ArrayBooleanType | ArrayNumberType | ArrayRegExpType;
interface OptionsType {
    [key: string]: FieldType;
    required: ArrayBooleanType;
    min: ArrayNumberType;
    max: ArrayNumberType;
    matches: ArrayRegExpType;
    string: ArrayBooleanType;
    number: ArrayBooleanType;
    boolean: ArrayBooleanType;
    date: ArrayBooleanType;
    email: ArrayBooleanType;
    password: ArrayBooleanType;
}
interface ErrorType {
    field: string;
    required: string;
    min: string;
    max: string;
    matches: string;
    string: string;
    number: string;
    boolean: string;
    date: string;
    email: string;
    password: string;
}
declare class SchemaBuilder {
    private passwordRegex;
    private emailRegex;
    private defaultError;
    private error;
    private errorStorage;
    private readonly default_type;
    private schema;
    private readonly options;
    build(user_input: Record<string | symbol, FieldOptions>): void;
    private createErrorObject;
    private addErrorToList;
    private validateSingleKey;
    private validateSingleType;
    validate(user_input: Record<string, string | boolean | number | RegExp | Date>): void;
    peek(): Record<string, FieldOptions | OptionsType>;
    peekError(): ErrorType[];
}
declare module "formulate-schema";
//# sourceMappingURL=index.d.ts.map