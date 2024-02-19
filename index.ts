//options type for schema type
type OptionsType = {
  required: boolean;
  min: number;
  max: number;
  matches: RegExp | null;
  string: boolean;
  number: boolean;
  boolean: boolean;
  date: boolean;
};

//main class
class SchemaBuilder {
  //initialization as private to ensure no outside access
  private schema: Record<string, OptionsType> | null = null;
  //initialization default_type in order to allow easy reset later
  private readonly default_type: OptionsType = {
    required: true,
    min: -1,
    max: -1,
    matches: null,
    string: false,
    number: false,
    boolean: false,
    date: false,
  };
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
          case "string":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Boolean.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "required":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Boolean.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "number":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Boolean.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "date":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Boolean.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "boolean":
            if (typeof user_input[input][option] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Boolean.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "min":
            if (typeof user_input[input][option] !== "number") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Number.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "max":
            if (typeof user_input[input][option] !== "number") {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Number.`
              );
            }
            console.log(user_input[input][option]);
            break;
          case "matches":
            if (
              typeof user_input[input][option] !== "object" &&
              user_input[input][option] instanceof RegExp
            ) {
              throw new TypeError(
                `Incorrect Type For ${option}, Must Be Regex Instantiated By new RegExp()' Constructor.`
              );
            }
            console.log(user_input[input][option]);
            break;
        }
        console.log("pass one");
      }

      //this is grabbing the 4 data types where the input can only be one not one or more
      //then it is returning 0 if more than one data type is checked or 1 if only one is
      const { number, boolean, date, string } = user_input[input];
      const dataTypesAreUnique: number =
        [number, boolean, date, string].filter((n) => n).length > 1 ? 0 : 1;

      if (dataTypesAreUnique === 0) {
        throw new Error(
          "Type Assignment Error: Can Only Assign One Data Type Constraint."
        );
      }
    }
    this.schema = user_input;
  }
  public peek() {
    return this.schema;
  }
}

module.exports = SchemaBuilder;

/*
import {SchemaBuidler} from strict-schema"

prefaced by "Strict", schema enforcements
* required
* min
* max
* matches
* string
* number
* array
* object 
* boolean
* date

schema utilities
* trim
* uppercase
* lowercase

schema.build({
    fullName: {string: true}
})

*/
