const schema2 = require("../index");

let schema1: any;
beforeEach(() => {
  schema1 = new schema2();
});
const correctPayload = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld11",
  age: 18,
  created_at: new Date(),
  username: "jacoblang11",
};
const correctSchemaToInsert = {
  fullName: {
    string: [true, "Full Name Must Be A Valid String"],
    matches: [
      true,
      new RegExp(/^[A-Za-z ]*$/),
      "Full Name Must Only Be Letters.",
    ],
    min: [5, "Full Name Must Not Be Less Than 5 Characters."],
    required: [true, "Full Name Required."],
  },
  email: {
    email: [true, "Must Be A Valid Email."],
    required: [true, "Email Required."],
  },
  password: {
    password: [
      true,
      "Must Be A Strong Password: containing uppercase, number, and lowercase.",
    ],
    min: [8, "Password Must Be Longer Than 8."],
    required: [true, "Password Required."],
  },
  age: {
    number: [true, "Age Must Be A Number."],
    min: [18, "Must Be Older Than 18"],
    required: [true, "Age Required."],
  },
  created_at: {
    date: [true, "Must Be A Valid Date."],
    required: [true, "Timestamp Required"],
  },
  username: {
    string: [true, "Username Must Be A String."],
    min: [5, "Username Must Be Longer Than 5 Characters."],
    required: [true, "Username Required."],
    matches: [
      true,
      new RegExp(/^[A-Za-z0-9]+$/),
      "Username Must Contain A Number, A Lowercase, and Uppercase Letter.",
    ],
  },
};
const incorrectSchemaToInsert = {
  fullName: {
    string: [true, "Full Name Must Be A Valid String"],
    number: [true, "Must Be A Number."],
    matches: [
      true,
      new RegExp(/^[A-Za-z ]*$/),
      "Full Name Must Only Be Letters.",
    ],
    min: [5, "Full Name Must Not Be Less Than 5 Characters."],
    required: [true, "Full Name Required."],
  },
  email: {
    email: [true, "Must Be A Valid Email."],
    required: [true, "Email Required."],
  },
};
const incorrectSchemaToInsertTwo = {
  fullName: {
    string: [1, "Full Name Must Be A Valid String"],
    number: [true, "Must Be A Number."],
    matches: [
      true,
      new RegExp(/^[A-Za-z ]*$/),
      "Full Name Must Only Be Letters.",
    ],
    min: [5, "Full Name Must Not Be Less Than 5 Characters."],
    required: [true, "Full Name Required."],
  },
  email: {
    email: [true, "Must Be A Valid Email."],
    required: [true, "Email Required."],
  },
};
const incorrectSchemaToInsertThree = {
  fullName: {
    string: [1, "Full Name Must Be A Valid String"],
    helloWorld: [true, "Hello world"],
    number: [true, "Must Be A Number."],
    matches: [
      true,
      new RegExp(/^[A-Za-z ]*$/),
      "Full Name Must Only Be Letters.",
    ],
    min: [5, "Full Name Must Not Be Less Than 5 Characters."],
    required: [true, "Full Name Required."],
  },
  email: {
    email: [true, "Must Be A Valid Email."],
    required: [true, "Email Required."],
  },
};
const expectReturnSchemaFromPeekMethod = {
  fullName: {
    string: [true, "Full Name Must Be A Valid String"],
    matches: [true, /^[A-Za-z ]*$/, "Full Name Must Only Be Letters."],
    min: [5, "Full Name Must Not Be Less Than 5 Characters."],
    required: [true, "Full Name Required."],
    max: [-1, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
    password: [false, ""],
  },
  email: {
    email: [true, "Must Be A Valid Email."],
    required: [true, "Email Required."],
    min: [-1, ""],
    max: [-1, ""],
    matches: [false, /(?:)/, ""],
    string: [false, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    password: [false, ""],
  },
  password: {
    password: [
      true,
      "Must Be A Strong Password: containing uppercase, number, and lowercase.",
    ],
    min: [8, "Password Must Be Longer Than 8."],
    required: [true, "Password Required."],
    max: [-1, ""],
    matches: [false, /(?:)/, ""],
    string: [false, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
  },
  age: {
    number: [true, "Age Must Be A Number."],
    min: [18, "Must Be Older Than 18"],
    required: [true, "Age Required."],
    max: [-1, ""],
    matches: [false, /(?:)/, ""],
    string: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
    password: [false, ""],
  },
  created_at: {
    date: [true, "Must Be A Valid Date."],
    required: [true, "Timestamp Required"],
    min: [-1, ""],
    max: [-1, ""],
    matches: [false, /(?:)/, ""],
    string: [false, ""],
    number: [false, ""],
    boolean: [false, ""],
    email: [false, ""],
    password: [false, ""],
  },
  username: {
    string: [true, "Username Must Be A String."],
    min: [5, "Username Must Be Longer Than 5 Characters."],
    required: [true, "Username Required."],
    matches: [
      true,
      /^[A-Za-z0-9]+$/,
      "Username Must Contain A Number, A Lowercase, and Uppercase Letter.",
    ],
    max: [-1, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
    password: [false, ""],
  },
};

describe("Tests The Build Function.", () => {
  test("sanity", () => {
    expect(true).toBe(true);
  });
  test("Error Is Thrown If More Than One DataType Is Marked As A Constraint", async () => {
    try {
      const result = await schema.build(incorrectSchemaToInsert);
      expect(result).toBe(null);
    } catch (err: any) {
      const message = err.message;
      const errType = err instanceof Error;
      expect(message).toBeTruthy();
      expect(errType).toBe(true);
      expect(message).toMatch(
        /type assignment error: can only assign one data type constraint./i
      );
    }
  });
  test("TypeError Is Thrown If Wrong Type Is Assigned To An Option Field.", async () => {
    try {
      const result = await schema.build(incorrectSchemaToInsertTwo);
      console.log("result", result);
    } catch (err: any) {
      const message = err.message;
      expect(err).toBeInstanceOf(TypeError);
      expect(message).toBe("Incorrect Type For 'string', Must Be Boolean.");
    }
  });
  test("Error Is Throw If Unacceptable Constraint Is Added To Schema Build.", async () => {
    try {
      const result = await schema.build(incorrectSchemaToInsertThree);
    } catch (err: any) {
      const message = err.message;
      expect(message).toBeTruthy();
      expect(message).toBe("Key Not Found In Schema Builder Type: helloWorld");
    }
  });
  test("Validates That Build Function Does Work And That The Peek Function Returns The Correct Schema.", () => {
    schema.build(correctSchemaToInsert);
    const resultingSchema = schema.peek();
    expect(resultingSchema).toMatchObject(expectReturnSchemaFromPeekMethod);
  });
});

describe("Tests Validate Function", () => {
  test("Throws Error If Property On Payload Does Not Match Properties On Schema.", async () => {
    try {
      schema.build(correctSchemaToInsert);
      const result = await schema.validate({
        fullName: "Jacob Lang",
        helloworld: "jacob",
      });
    } catch (err: any) {
      const message = err.message;
      expect(message).toBeTruthy();
      expect(message).toBe("Schema Does Not Include Property: helloworld.");
    }
  });
  test("Throws Error If Fields Required On Schema Are Not Present.", async () => {
    try {
      schema.build(correctSchemaToInsert);
      await schema.validate({ fullName: "Jacob Lang" });
    } catch (err: any) {
      const expectedResult = [
        { field: "email", email: "Email Required." },
        { field: "password", password: "Password Required." },
        { field: "age", age: "Age Required." },
        { field: "created_at", created_at: "Timestamp Required" },
        { field: "username", username: "Username Required." },
      ];
      expect(err).toMatchObject(expectedResult);
    }
  });
  test("Throws TypeError Returns Array Of Error Objects.", async () => {
    try {
      schema.build(correctSchemaToInsert);
      correctPayload.email = "jacoblang";
      correctPayload.age = 17;
      correctPayload.fullName = "ja11";
      correctPayload.password = "jaco";
      correctPayload.username = "jac";
      await schema.validate(correctPayload);
    } catch (err) {
      expect(err).toMatchObject([
        { field: "fullName", matches: "Full Name Must Only Be Letters." },
        {
          field: "fullName",
          min: "Full Name Must Not Be Less Than 5 Characters.",
        },
        { field: "email", email: "Must Be A Valid Email." },
        {
          field: "password",
          password:
            "Must Be A Strong Password: containing uppercase, number, and lowercase.",
        },
        { field: "password", min: "Password Must Be Longer Than 8." },
        { field: "age", min: "Must Be Older Than 18" },
        {
          field: "username",
          min: "Username Must Be Longer Than 5 Characters.",
        },
      ]);
    }
  });
  test("Tests That No Error Is Thrown If Payload Is Correct.", async () => {
    try {
      const correctPayload1 = {
        fullName: "Jacob Lang",
        email: "jacoblang127@gmail.com",
        password: "helloWorld11",
        age: 18,
        created_at: new Date(),
        username: "jacoblang11",
      };
      schema.build(correctSchemaToInsert);
      const result = await schema.validate(correctPayload1);
      expect(result).toBeFalsy();
    } catch (err) {
    }
  });
});
