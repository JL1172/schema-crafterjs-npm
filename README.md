# Formulate Schema

Formulate Schema is a lightweight and strongly-typed form validation package designed for use with TypeScript. It allows you to define schemas for your form fields and validate payloads against these schemas. This package has no dependencies or dependents, making it easy to integrate into your projects.

## Installation

To install Formulate Schema, you can use npm:

```bash
npm install formulate-schema
```

## Usage

```javascript
// Import the SchemaBuilder class
import SchemaBuilder from "formulate-schema";
// or
const SchemaBuilder = require("formulate-schema");

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

### `peek()`# Formulate Schema

Formulate Schema is a lightweight and strongly-typed form validation package designed for use with TypeScript. It allows you to define schemas for your form fields and validate payloads against these schemas. This package has no dependencies or dependents, making it easy to integrate into your projects.

## Installation

To install Formulate Schema, you can use npm:

## Usage

```javascript
// Import the SchemaBuilder class
import SchemaBuilder from "formulate-schema";
// or
const SchemaBuilder = require("formulate-schema");

// Create a new instance of SchemaBuilder
const schema = new SchemaBuilder();
```


The `peek()` method returns the schema object. This is useful for development purposes when you need to inspect the defined schema.

## Example

```javascript
// Define schema
schema.build({
  fullName: { required: [true, "Full name is required"] },
  age: { number: [true, "Age must be a number"], min: [18, "Must be at least 18 years old"] },
  email: { email: [true, "Invalid email address"] },
  password: { password: [true, "Password must contain uppercase, lowercase, and numbers"] }
});

// Validate payload
const payload = {
  fullName: "John Doe",
  age: 25,
  email: "john.doe@example.com",
  password: "Password123"
};
const isValid = schema.validate(payload);
console.log(isValid); // Output: true
```

## License

This package is licensed under the MIT License.
