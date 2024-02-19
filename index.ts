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
  //initializing constructor
  //main builder function
  public build(user_input: Record<string | symbol, OptionsType>) {
    for (const input in user_input) {
      //this is grabbing the 4 data types where the input can only be one
      const {number, boolean, date, string} = user_input[input]; 
      //then it is returning 0 if more than one data type is checked or 1 if only one is
      const dataTypesAreUnique: number = [number, boolean, date, string].filter(n => n).length > 1 ? 0 : 1;
      if (dataTypesAreUnique === 0) {
        throw new Error('Type Assignment Error: Can Only Assign One Data Type Constraint.');
      }
    }
    this.schema = user_input;
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
