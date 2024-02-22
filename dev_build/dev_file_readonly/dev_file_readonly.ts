//this interface is for establishing the schema on the schema.build method
//these types allow the handling of a boolean or number or regexp and then the string, this is for the error message
/*
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
//this interface is for the schema when these fields are required to be filled out, a little unecessary, but nice to have just in case
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
//this interface is for the returned error array, this dto makes up all records in the errorStorage array
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

//this is the only class in this package
class SchemaBuilder {
  //password regex
  private passwordRegex: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //email regex
  private emailRegex: RegExp =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  //the error type that exists within the errorstorage array as such ErrorType[]
  private defaultError: ErrorType = {
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
  //initialization default_type in order to allow easy reset later
  private readonly default_type: OptionsType = {
    required: [true, ""],
    min: [-1, ""],
    max: [-1, ""],
    matches: [false, new RegExp(""), ""],
    string: [false, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
    password: [false, ""],
  };
  //this is the main schema that is carried along the entire process, there is a place holder that has all default values
  private schema: Record<string, OptionsType | FieldOptions> = {
    demo: this.default_type,
  };
  //setting options
  private readonly options: OptionsType = this.default_type;
  //main builder function
  public build(user_input: Record<string | symbol, FieldOptions>) {
    if (!user_input) {
      throw new Error("This Method Requires An Argument.");
    }
    for (const input in user_input) {
      //ensuring no keys in userinput vary from keys in options, making sure no errors, etc.
      const keys = Object.keys(user_input[input]);
      keys.forEach((n) => {
        if (!(n in this.options)) {
          throw new Error(`Key Not Found In Schema Builder Type: ${n}`);
        }
      });
      //now switch statement for type checking, this ensures that the options set, all have correct types they are set to
      for (const option in user_input[input]) {
        switch (option) {
          case "email":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "password":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "string":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "required":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "number":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "date":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "boolean":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "min":
            if (typeof user_input[input][option]?.[0] !== "number") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Number.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "max":
            if (typeof user_input[input][option]?.[0] !== "number") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Number.`
              );
            }
            if (typeof user_input[input][option]?.[1] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
          case "matches":
            if (typeof user_input[input][option]?.[0] !== "boolean") {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Boolean.`
              );
            }
            if (!(user_input[input][option]?.[1] instanceof RegExp)) {
              throw new TypeError(
                `Incorrect Type For '${option}', Must Be Regex Instantiated By new RegExp()' Constructor.`
              );
            }
            if (typeof user_input[input][option]?.[2] !== "string") {
              throw new TypeError(
                `Incorrect Type For Error Message: ${option}, Must Be A String.`
              );
            }
            break;
        }
      }
      //this is grabbing the 6 data types where the input can only be one not one or more then it is returning 0 if more than one data type is checked or 1 if only one is
      const { number, boolean, date, string, email, password } =
        user_input[input];
      const dataTypesAreUnique: number =
        [
          number?.[0],
          boolean?.[0],
          date?.[0],
          string?.[0],
          email?.[0],
          password?.[0],
        ].filter((n) => n).length > 1
          ? 0
          : 1;
      if (dataTypesAreUnique === 0) {
        throw new Error(
          "Type Assignment Error: Can Only Assign One Data Type Constraint."
        );
      }
    }
    //last thing, creating the final schema with all of the missing pieces that mightve been omitted, this is for consistency later down the line
    //first loop loops through the options
    for (const option in this.options) {
      //second loop loops through the properties in the user input fullName, username, etc.
      for (const property in user_input) {
        //it is reconciling if userinput[property] (fullName: {string: true}) has all the necessary "meta" configuration,
        if (!user_input[property].hasOwnProperty(option)) {
          //if it doesn't it adds the property, by assigning user_input to shallow copy with that option dynamically added to the default value
          user_input[property] = {
            ...user_input[property],
            [option]: this.options[option],
          };
        }
      }
    }
    //on success the schema object now is assigned to the validated and modified schema that can now be processed
    this.schema = user_input;
  }
  //these are all util functions
  //this just packages the error into a nice presentable object and returns it
  private createErrorObject(rule: string, key: string, errorMessage: string) {
    const errorPartOne = { ...this.error, [rule]: errorMessage, field: key };
    return errorPartOne;
  }
  //this is a setter method that adds the error to the errorStorage object which is inevitably returned to the user at the end of all of this
  private addErrorToList(error: ErrorType) {
    const entries = Object.entries(error).filter(
      (n) => n[0] !== "field" && n[1]
    );
    const index = this.errorStorage.findIndex((n) => n.field === error.field);
    if (index !== -1) {
      this.errorStorage[index] = {
        ...this.errorStorage[index],
        [entries[0][0]]: entries[0][1],
      };
    } else {
      this.errorStorage.push(error);
    }
  }
  //this validates that the schema has a one to one replica per-se of the keys in the given payload
  private validateSingleKey(key: string) {
    return this.schema.hasOwnProperty(key);
  }
  //this validates the types of the payload
  //this is the true validation function, that takes in the fieldKey name so fullName and its value and validates its type against the constraints written on the schema
  private validateSingleType(fieldKey: string, fieldValue: any) {
    //these are the rules or constraints of each inputted fieldkey
    const ruleSet: OptionsType | FieldOptions = this.schema[fieldKey];
    //now it loops through the rules or constraints
    for (const rule in ruleSet) {
      //start of switch case looping through the rules, string, date, min, password etc.
      //if the constraint is not met, it calls on the createErrorObject method to create an error object then adds it to the errorStorage array
      switch (rule) {
        case "string":
          if (ruleSet[rule]?.[0]) {
            if (typeof fieldValue !== "string") {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be String.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "number":
          if (ruleSet[rule]?.[0]) {
            if (typeof fieldValue !== "number") {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be Number.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "date":
          if (ruleSet[rule]?.[0]) {
            if (!(fieldValue instanceof Date)) {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be Date.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "boolean":
          if (ruleSet[rule]?.[0]) {
            if (typeof fieldValue !== "boolean") {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be Boolean.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "email":
          if (ruleSet[rule]?.[0]) {
            if (!this.emailRegex.test(fieldValue)) {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be A Valid Email.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "password":
          if (ruleSet[rule]?.[0]) {
            if (!this.passwordRegex.test(fieldValue)) {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message ? message : `${fieldKey} Must Be A Strong Password.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "min":
          //this case is different but not too much
          //it first checks if the val is a number, if it isn't it is trimmed, else: not
          if (ruleSet[rule]?.[0] !== -1) {
            const trimmedValue = isNaN(fieldValue)
              ? fieldValue.trim()
              : fieldValue;
            const minRule = ruleSet[rule]?.[0];
            //this is ensuring minrule is truthy, and if it is and it is nan and trimmed.lenght is less then minRule of ruleset[rule] or if minrule is truthy and its greater than the trimmedvalu then it throws an error, maxRule is also the same
            if (
              (minRule &&
                isNaN(trimmedValue) &&
                trimmedValue.length < minRule) ||
              (minRule && trimmedValue < minRule)
            ) {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message
                  ? message
                  : isNaN(fieldValue)
                  ? `${fieldKey} Must Be A Length Greater Than ${ruleSet[rule]} Characters.`
                  : `${fieldKey} Must Be Greater Than ${ruleSet[rule]}.`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "max":
          if (ruleSet && ruleSet[rule]?.[0] !== -1) {
            const trimmedValue = isNaN(fieldValue)
              ? fieldValue.trim()
              : fieldValue;
            const maxRule = ruleSet[rule]?.[0];
            if (
              (maxRule &&
                isNaN(trimmedValue) &&
                trimmedValue.length > maxRule) ||
              (maxRule && trimmedValue > maxRule)
            ) {
              const message = ruleSet[rule]?.[1];
              const errorToInsert = this.createErrorObject(
                rule,
                fieldKey,
                message
                  ? message
                  : isNaN(fieldValue)
                  ? `${fieldKey} Must Be A Length Less Than ${ruleSet[rule]} Characters.`
                  : `${fieldKey} Must Be Less Than ${ruleSet[rule]}`
              );
              this.addErrorToList(errorToInsert);
            }
          }
          break;
        case "matches":
          const trimmedValue = isNaN(fieldValue)
            ? fieldValue.trim()
            : fieldValue;
          const regIsOccupied = ruleSet[rule]?.[0];
          const reg = ruleSet[rule]?.[1];
          if (regIsOccupied && !(reg && reg.test(trimmedValue))) {
            const message = ruleSet[rule]?.[2];
            const errorToInsert = this.createErrorObject(
              rule,
              fieldKey,
              message
                ? message
                : `${fieldKey} Does Not Contain Correct Patterns. ${ruleSet[rule]?.[0]}.`
            );
            this.addErrorToList(errorToInsert);
          }
          break;
      }
    }
  }
  //this expects the user input to be once a user submits an entire payload
  public validate(
    user_input: Record<string, string | boolean | number | RegExp | Date>
  ) {
    this.errorStorage = [this.defaultError];
    if (!user_input) {
      throw new Error("Cannot Submit Empty Payload.");
    }
    //first need to loop through given input, this could be an entire payload after a user clicks a button
    //this loop validates that there are no extraneous properties on the user payload that do not align with the schema
    for (const property in user_input) {
      if (!this.validateSingleKey(property)) {
        throw new Error(`Schema Does Not Include Property: ${property}.`);
      }
    }
    //this ensures that the input has all of the properties that were required by the schema
    for (const s in this.schema) {
      if (this.schema[s].required?.[0]) {
        const message = this.schema[s].required?.[1];
        if (
          !user_input.hasOwnProperty(s) ||
          (user_input.hasOwnProperty(s) && !user_input[s])
        ) {
          const errorToInsert = this.createErrorObject(
            s,
            s,
            message ? message : `${s} Field Is Required.`
          );
          this.addErrorToList(errorToInsert);
        }
      }
    }
    //now i am going to validate the types against their constraints pre defined by the schema
    for (const property in user_input) {
      this.validateSingleType(property, user_input[property]);
    }
    //this code below grabs the error object array this.errorStorage;
    //it loops through the storage, takes the entries, filters through them and returns only those errors that are truthy and then makes an object from those entries and then spreads the trimmedErrorObject array and inserts that object in it, then at the end, it throws it
    let trimmedErrorObject: Record<string, string>[] = [];
    for (const err in this.errorStorage) {
      const entries = Object.entries(this.errorStorage[err]);
      const filteredEntries = Object.fromEntries(
        entries.filter((n, i) => n[1])
      );
      trimmedErrorObject = [...trimmedErrorObject, filteredEntries];
    }
    if (trimmedErrorObject.slice(1).length > 0) {
      throw trimmedErrorObject.slice(1);
    } else {
      return;
    }
  }
  public peek() {
    return this.schema;
  }
  public peekError() {
    return this.errorStorage;
  }
}
module.exports = SchemaBuilder;
*/