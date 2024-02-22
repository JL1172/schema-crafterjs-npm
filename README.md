# SchemaCrafterJs

SchemaCrafterJs is a lightweight and strongly-typed form validation package designed for use with TypeScript. It allows you to define schemas for your form fields and validate payloads against these schemas. This package has no dependencies or dependents, making it easy to integrate into your projects.

## Installation

To install SchemaCrafterJs, you can use npm:

```bash
npm install schemacrafterjs
```

## Usage

```javascript
// Import the SchemaBuilder class
import SchemaBuilder from "schemacrafterjs";
// or
const SchemaBuilder = require("schemacrafterjs");

// Create a new instance of SchemaBuilder
const schema = new SchemaBuilder();
```

## Methods

### `build()`

The `build()` method is used to define the schema for your form fields. It takes an object with keys representing field names and options representing field constraints. Available options include:

- `required`: Specifies if the field is required.
- `min`: Specifies the minimum value for numeric fields.
- `max`: Specifies the maximum value for numeric fields.
- `matches`: Specifies a regular expression pattern that the field must match.
- `string`: Specifies if the field value must be a string.
- `number`: Specifies if the field value must be a number.
- `boolean`: Specifies if the field value must be a boolean.
- `date`: Specifies if the field value must be a date.
- `email`: Specifies if the field value must be a valid email address.
- `password`: Specifies if the field value must meet password requirements (uppercase, lowercase, and numbers).

### `validate(payload)`

The `validate()` method is used to validate a payload against the defined schema. It expects a payload object that matches the schema defined using the `build()` method. Validation is performed based on the constraints specified in the schema.

### `peek()`

The `peek()` method returns the schema object. This is useful for development purposes when you need to inspect the defined schema.

### `peekError()`

The `peekError()` method returns the current error object. This is useful for development purposes.

## Example

```javascript
// Define schema
async function buildSchema() {
  try {
    await schema.build({
      fullName: { required: [true, "Full name is required"], string: [true, "Full Name Must Be String."], matches: [true, new RegExp(/^[A-Za-z]*$/), "Full Name Must Only Be Letters."] },
      age: { number: [true, "Age must be a number"], min: [18, "Must be at least 18 years old"] },
      email: { email: [true, "Invalid email address"] },
      password: { password: [true, "Password must contain uppercase, lowercase, and numbers"], min: {8, "Password Must Have A Min Length of 8 Characters."} }
    });
  } catch (err) {
    //if error is thrown it will be caught here.
    //can expect errors to be typeerrors or errors.
    //wrapping in try catch block allows for graceful error handling in the development process.
  }
}

// Validate payload
const payload = {
  fullName: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  password: "Password123"
};
async function submitForm(payload) {
  try {
    const result = await schema.validate(payload);
    //will return undefined if valid;
  } catch (err) {
    //errors are thrown on in valid submission, therefore, a try catch block is sufficient to handle these errors. On submission success, the result will be undefined;
    //can expect error to be instance of Error.
    //result will be errors objects in array.
    console.log(err);
  }
}
submitForm(payload);
```

## License

This package is licensed under the ISC License.
