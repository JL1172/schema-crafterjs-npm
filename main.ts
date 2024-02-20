const SchemaBuidler = require("./index");

const schema = new SchemaBuidler();

schema.build({
  fullName: { string: true, required: true },
  email: { email: true },
  username: {
    string: true,
    required: true,
    min: 3,
    max: 20,
  },
  password: {
    password: true,
    required: true,
    min: 8,
  },
  age: {
    number: true,
    required: true,
    min: 18,
    max: 120,
  },
});

async function validation() {
  try {
    await schema.validate({
      fullName: "ed",
      email: "jacoblang127gmail.com",
      username: "w",
      password: "helloWorld",
      age: 11,
    });
  } catch (err) {
    console.log(err);
  }
}
validation();
// const schema_peeked = schema.peek();
// console.log(schema_peeked);
