const SchemaBuidler = require("./index");

const schema = new SchemaBuidler();

schema.build({
  fullName: { string: true, required: true },
  email: { string: true, required: true },
  username: {
    string: true,
    required: true,
    min: 3,
    max: 20,
  },
  password: {
    string: true,
    required: true,
    min: 8,
    matches: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  },
  age: {
    number: true,
    required: true,
    min: 18,
    max: 120,
  },
});

schema.validate({fullName: 'jacob lang', email: 'jacoblang127@gmail.com', username: 'jacoblang11', password: 'helloworld', age: 17,});
// const schema_peeked = schema.peek();
// console.log(schema_peeked);
