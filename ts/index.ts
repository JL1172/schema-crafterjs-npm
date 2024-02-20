//options type for schema type
type OptionsType = {
  [key: string]: boolean | RegExp | string | number;
  required: boolean;
  min: number;
  max: number;
  matches: RegExp;
  string: boolean;
  number: boolean;
  boolean: boolean;
  date: boolean;
  email: boolean;
  password: boolean;
};
type ErrorType = {
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
};
//main class
class SchemaBuilder {
  //password regex
  private passwordRegex: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //email regex
  private emailRegex: RegExp =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  //initialization as private to ensure no outside access
  //initialization default_type in order to allow easy reset later
  private error: ErrorType = {
    field: "",
    required: "",
    min: "",
    max: "",
    matches: "",
    string: "",
    number: "",
    boolean: "",
    date: "",
    email: "",
    password: "",
  };
  private errorStorage: ErrorType[] = [
    {
      field: "",
      required: "",
      min: "",
      max: "",
      matches: "",
      string: "",
      number: "",
      boolean: "",
      date: "",
      email: "",
      password: "",
    },
  ];
  private readonly default_type: OptionsType = {
    required: true,
    min: -1,
    max: -1,
    matches: new RegExp(""),
    string: false,
    number: false,
    boolean: false,
    date: false,
    email: false,
    password: false,
  };

  private schema: Record<string, OptionsType> = { demo: this.default_type };
  //setting options
  private readonly options: OptionsType = this.default_type;
  //main builder function
  public build(user_input: Record<string | symbol, OptionsType>) {
    for (const input in user_input) {
      //ensuring no keys in userinput vary from keys in options
      const keys = Object.keys(user_input[input]);
      keys.forEach((n) => {
        if (!(n in this.options)) {
          throw new Error(`Key Not Found In Schema Builder Type: ${n}`);
        }
      });
      //now switch statement for type checking
      for (const option in user_input[input]) {
        switch (option) {
          case "email":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "password":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "string":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "required":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "number":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "date":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "boolean":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            break;
          case "min":
            if (typeof user_input[input][option] !== "number") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Number.`
              );
            }
            break;
          case "max":
            if (typeof user_input[input][option] !== "number") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Number.`
              );
            }
            break;
          case "matches":
            if (
              typeof user_input[input][option] !== "object" &&
              user_input[input][option] instanceof RegExp
            ) {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Regex Instantiated By new RegExp()' Constructor.`
              );
            }
            break;
        }
      }

      //this is grabbing the 4 data types where the input can only be one not one or more
      //then it is returning 0 if more than one data type is checked or 1 if only one is
      const { number, boolean, date, string, email, password } =
        user_input[input];
      const dataTypesAreUnique: number =
        [number, boolean, date, string, email, password].filter((n) => n)
          .length > 1
          ? 0
          : 1;
      if (dataTypesAreUnique === 0) {
        throw new Error(
          "Type Assignment Error: Can Only Assign One Data Type Constraint."
        );
      }
    }
    //last thing, creating the final schema with all of the missing pieces that mightve been omitted
    for (const option in this.options) {
      for (const property in user_input) {
        if (!user_input[property].hasOwnProperty(option)) {
          user_input[property] = {
            ...user_input[property],
            [option]: this.options[option],
          };
        }
      }
    }
    this.schema = user_input;
  }
  private createErrorObject(rule: string, key: string, errorMessage: string) {
    const errorPartOne = { ...this.error, [rule]: errorMessage, field: key };
    return errorPartOne;
  }
  private addErrorToList(error: ErrorType) {
    this.errorStorage.push(error);
  }
  private validateSingleKey(key: string) {
    return this.schema.hasOwnProperty(key);
  }
  private validateSingleType(fieldKey: string, fieldValue: any) {
    const ruleSet: OptionsType = this.schema[fieldKey];
    for (const rule in ruleSet) {
      switch (rule) {
        case "string":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "string") {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be String.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "number":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "number") {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be Number.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "date":
          if (ruleSet[rule]) {
            if (fieldValue instanceof Date) {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be Date.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "boolean":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "boolean") {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be Boolean.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "email":
          if (ruleSet[rule]) {
            if (!this.emailRegex.test(fieldValue)) {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be A Valid Email.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "password":
          if (ruleSet[rule]) {
            if (!this.passwordRegex.test(fieldValue)) {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                `${fieldKey} Must Be A Strong Password.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "min":
          if (ruleSet[rule] !== -1) {
            const trimmedValue = isNaN(fieldValue)
              ? fieldValue.trim()
              : fieldValue;
            if (
              (isNaN(trimmedValue) && trimmedValue.length < ruleSet[rule]) ||
              trimmedValue < ruleSet[rule]
            ) {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                isNaN(fieldValue)
                  ? `${fieldKey} Must Be A Length Greater Than ${ruleSet[rule]} Characters.`
                  : `${fieldKey} Must Be Greater Than ${ruleSet[rule]}.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "max":
          if (ruleSet[rule] !== -1) {
            const trimmedValue = isNaN(fieldValue)
              ? fieldValue.trim()
              : fieldValue;
            if (
              (isNaN(trimmedValue) && trimmedValue.length > ruleSet[rule]) ||
              trimmedValue > ruleSet[rule]
            ) {
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                isNaN(fieldValue)
                  ? `${fieldKey} Must Be A Length Less Than ${ruleSet[rule]} Characters.`
                  : `${fieldKey} Must Be Less Than ${ruleSet[rule]}.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "matches":
          const trimmedValue = isNaN(fieldValue)
            ? fieldValue.trim()
            : fieldValue;
          if (!ruleSet[rule].test(trimmedValue)) {
            const errorToInsert = this.createErrorObject(
              rule,
              fieldKey,
              `${fieldKey} Does Not Contain Correct Patterns. ${ruleSet[rule]}.`
            );
            this.addErrorToList(errorToInsert);
          }
          break;
      }
    }
  }
  public validate(
    user_input: Record<string, string | boolean | number | RegExp>
  ) {
    //first need to loop through given input, this could be an entire payload after a user clicks a button
    //this loop validates that there are no extraneous properties on the user payload that do not align with the schema
    for (const property in user_input) {
      if (!this.validateSingleKey(property)) {
        throw new Error(`Schema Does Not Include Property: ${property}.`);
      }
    }
    //this ensures that the input has all of the properties that were required by the schema
    for (const s in this.schema) {
      if (this.schema[s].required) {
        if (!user_input.hasOwnProperty(s)) {
          const errorToInsert = this.createErrorObject(
            s,
            s,
            `${s} Field Is Required.`
          );
          this.addErrorToList(errorToInsert);
        }
      }
    }
    //now i am going to validate the types z(f(x))
    for (const property in user_input) {
      this.validateSingleType(property, user_input[property]);
    }

    throw this.errorStorage.slice(1);
  }
  public peek() {
    return this.schema;
  }
}
