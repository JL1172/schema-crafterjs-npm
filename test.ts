import { SchemaBuilder } from "./index";

const schema = new SchemaBuilder();

schema.build({
  fullName: {
    string: [true, "Full Name Must Be A String"],
    min: [4, "Must Be Greater Than 4 Chars."],
    max: [40, "Must Be Less Then 40 Chars."],
  },
  email: { email: [true, "Must Be A Valid Email"] },
  password: { password: [true, "Must Be A Strong Password"] },
  username: {
    matches: [true, /^[A-Za-z0-9]+$/, "must contain letters and numbers"],
    min: [5, "Must Be Greater than 5"],
    max: [20, "Must Be Less Than 20"],
  },
  age: {
    number: [true, "must be a number"],
    min: [18, "Must Be Greater than 18"],
    max: [120, "Age Must Be Less Than 120"],
  },
  created_at: { date: [true, "Must Be A Valid Date"] },
});

async function validateSubmission() {
  try {
    schema.validate({
      fullName: "JacobLang",
      email: "jacoblang127@gmail.com",
      password: "helloWorld11",
      username: "jacoblang11",
      age: 18,
      created_at: new Date(),
    });
  } catch (err) {
    console.log(err);
  }
}

validateSubmission();

// console.log(schema.peek());
