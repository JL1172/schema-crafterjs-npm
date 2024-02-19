const { OptionsType } = require("./src/dto");

class SchemaBuilder {
  private schema: typeof OptionsType;

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

  private readonly options: OptionsType = this.default_type;

  public build(user_input: Record<string | symbol, OptionsType>) {
    for (const input in user_input) {
      console.log(input);
    }
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
