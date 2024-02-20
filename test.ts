import { SchemaBuilder } from "./index";

const schema = new SchemaBuilder();

schema.build({
  fullName: { string: true, min: 4, max: 40 },
  email: { email: true },
  password: { password: true },
  username: { matches: /^[A-Za-z0-9]*$/, min: 5, max: 20 },
  age: { min: 18, max: 120 },
  created_at: { date: true },
});

async function validateSubmission() {
  try {
    schema.validate({
      fullName: "JacobLang",
      email: "jacoblang",
      password: "hello",
      username: "jacob",
      age: 17,
      created_at: 8,
    });
  } catch (err) {
    console.log(err);
  }
}

validateSubmission();
console.log(schema.peek());
