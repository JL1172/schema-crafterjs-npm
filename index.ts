//email regex
const emailRegex: RegExp =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
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
};

//main class
class SchemaBuilder {
  //initialization as private to ensure no outside access
  //initialization default_type in order to allow easy reset later
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
  };

  private schema: Record<string, OptionsType>;
  constructor() {
    this.schema = { demo: this.default_type };
  }
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
      const { number, boolean, date, string, email } = user_input[input];
      const dataTypesAreUnique: number =
        [number, boolean, date, string, email].filter((n) => n).length > 1
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
  private validateSingleKey(key: string) {
    return this.schema.hasOwnProperty(key);
  }
  private validateSingleType(fieldKey: string, fieldValue: any) {
    const ruleSet: OptionsType = this.schema[fieldKey];
    console.log(fieldKey, fieldValue);
    console.log(ruleSet);
    for (const rule in ruleSet) {
      switch (rule) {
        case "string":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "string") {
              throw new TypeError(`${fieldKey} Must Be String.`);
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "number":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "number") {
              throw new TypeError(`${fieldKey} Must Be Number.`);
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "date":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "object") {
              throw new TypeError(`${fieldKey} Must Be Date.`);
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "boolean":
          if (ruleSet[rule]) {
            if (typeof fieldValue !== "boolean") {
              throw new TypeError(`${fieldKey} Must Be Boolean.`);
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "email":
          if (ruleSet[rule]) {
            if (!emailRegex.test(fieldValue)) {
              throw new TypeError(`${fieldKey} Must Be A Valid Email.`);
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "min":
          if (ruleSet[rule] !== -1) {
            const trimmedValue = fieldValue.trim();
            if (trimmedValue < ruleSet[rule]) {
              throw new Error(
                `${rule} Must Be A Length Greater Than ${ruleSet[rule]} Characters.`
              );
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "max":
          if (ruleSet[rule] !== -1) {
            const trimmedValue = fieldValue.trim();
            if (trimmedValue < ruleSet[rule]) {
              throw new Error(
                `${rule} Must Be A Length Less Than ${ruleSet[rule]} Characters.`
              );
            }
          }
          console.log(rule, ruleSet[rule]);
          break;
        case "matches":
          const trimmedValue = fieldValue.trim();
          if (!ruleSet[rule].test(trimmedValue)) {
            throw new Error(
              `${rule} Must Be A Length Less Than ${ruleSet[rule]} Characters.`
            );
          }
          console.log(rule, ruleSet[rule]);
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
          throw new Error(`${s} Field Is Required.`);
        }
      }
    }
    //now i am going to validate the types
    for (const property in user_input) {
      this.validateSingleType(property, user_input[property]);
    }
  }
  public peek() {
    return this.schema;
  }
}

module.exports = SchemaBuilder;
