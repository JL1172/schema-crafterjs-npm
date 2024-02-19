//email regex
const emailRegex: RegExp =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
//options type for schema type
type OptionsType = {
  [key: string]: boolean | RegExp | string | number;
  required: boolean;
  min: number;
  max: number;
  matches: RegExp | string;
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
    matches: "",
    string: false,
    number: false,
    boolean: false,
    date: false,
    email: false,
  };
  private schema: Record<string, OptionsType> | undefined = undefined;
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
          user_input[property] = {...user_input[property], [option]: this.options[option]};
        }
      }
    }
    this.schema = user_input;
  }
  public peek() {
    return this.schema;
  }
}

module.exports = SchemaBuilder;
