const SBuilder = require("../schema-builder-class/schema-builder-class");

const schema = new SBuilder();

const INSUFFICIENT_PAYLOAD_INSTANCE = {
  fullName: "",
  email: "",
  password: "",
  age: "",
  created_at: "",
  username: "",
};
const INCORRECT_PAYLOAD_MIN_INSTANCE = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld11",
  age: 17,
  created_at: new Date(),
  username: "jacoblang11",
};
const INCORRECT_PAYLOAD_EMAIL_INSTANCE = {
  fullName: "Jacob Lang",
  email: "jacoblang127gmail.com",
  password: "helloWorld11",
  age: 17,
  created_at: new Date(),
  username: "jacoblang11",
};
const INCORRECT_PAYLOAD_MAX_INSTANCE = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld11",
  age: 122,
  created_at: new Date(),
  username: "jacoblang11",
};
const INCORRECT_PAYLOAD_PASSWORD_INSTANCE = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld",
  age: 18,
  created_at: new Date(),
  username: "jacoblang11",
};
const OMITTED_PAYLOAD_INSTANCE = {
  fullName: "",
};
const EXPECTED_ERROR_OBJECT = [
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
const CORRECT_PAYLOAD = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld11",
  age: 18,
  created_at: new Date(),
  username: "jacoblang11",
};
const INCORRECT_PAYLOAD_REGEX_INSTANCE = {
  fullName: "Jacob Lang",
  email: "jacoblang127@gmail.com",
  password: "helloWorld11",
  age: 18,
  created_at: new Date(),
  username: "jacoblang11?",
};
const EXTRANEOUS_PROPERTY_INSTANCE = {
  fullName: "jacob lang",
  helloWorld: "this will throw an error.",
};
const EXPECT_SCHEMA = {
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
    max: [120, ""],
    required: [true, "Age Required."],
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

const CORRECT_SCHEMA = {
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
    max: [120, ""],
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
const INCORRECT_TYPE_ASSIGNMENT = {
  fullName: {
    date: [true, "Must Be A Date"],
    string: [true, "Must Be A String"],
  },
};
const INCORRECT_CONSTRAINT_TYPE_ASSIGNMENT = {
  fullName: {
    min: [true, "Will Throw An Error."],
  },
};
const INCORRECT_CONSTRAINT_ADDITION = {
  fullName: {
    red: [true, "Will Throw An Error."],
  },
};
const INCORRECT_TYPE_FOR_CUSTOM_MESSAGE = {
  fullName: {
    string: [true, 567],
  },
};
const INCORRECT_TYPE_REGEX_VARIATION_ONE = {
  username: {
    matches: ["", new RegExp(""), ""],
  },
};
const INCORRECT_TYPE_REGEX_VARIATION_TWO = {
  username: {
    matches: [true, new Date(), ""],
  },
};
const INCORRECT_TYPE_REGEX_VARIATION_THREE = {
  username: {
    matches: [true, new RegExp(""), 5],
  },
};
const EXPECTED_DEMO_SCHEMA = {
  demo: {
    required: [true, ""],
    min: [-1, ""],
    max: [-1, ""],
    matches: [false, /(?:)/, ""],
    string: [false, ""],
    number: [false, ""],
    boolean: [false, ""],
    date: [false, ""],
    email: [false, ""],
    password: [false, ""],
  },
};

describe("Runs Every Edge Case And Ensures The Data Pipeline Does Not Get Clogged.", () => {
  test('Throws Type Error If Schema Assigns More Than One Data Type To Key (ex: fullName: {date:[true,""], string:[true,""]}).', async () => {
    try {
      await schema.build(INCORRECT_TYPE_ASSIGNMENT);
    } catch (err: any) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe(
        "Type Assignment Error: Can Only Assign One Data Type Constraint."
      );
      expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
    }
  });
  test('Throws Error If Constraint Is Passed With Improper Format (ex: fullName: {min: [true, ""]}, Incorrect Because Min Constraint Expects A Number).', async () => {
    try {
      await schema.build(INCORRECT_CONSTRAINT_TYPE_ASSIGNMENT);
    } catch (err: any) {
      expect(err).toBeInstanceOf(TypeError);
      expect(err.message).toBe("Incorrect Type For 'min', Must Be Number.");
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws Error If No Arguments Are Given.", async () => {
    try {
      await schema.build();
    } catch (err: any) {
      expect(err.message).toBe("This Method Requires An Argument.");
      expect(err).toBeInstanceOf(Error);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws Error If Constraint Outside Of What Are Acceptable Options Is Assigned As Constraint To Schema.", async () => {
    try {
      await schema.build(INCORRECT_CONSTRAINT_ADDITION);
    } catch (err: any) {
      expect(err.message).toBe("Key Not Found In Schema Builder Type: red");
      expect(err).toBeInstanceOf(Error);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws Error If Second Argument To Constraint Is Not String.", async () => {
    try {
      await schema.build(INCORRECT_TYPE_FOR_CUSTOM_MESSAGE);
    } catch (err: any) {
      expect(err.message).toBe(
        "Incorrect Type For Error Message: string, Must Be A String."
      );
      expect(err).toBeInstanceOf(Error);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws Error For Regex If Instantiated Incorrectly [ARG ONE].", async () => {
    try {
      await schema.build(INCORRECT_TYPE_REGEX_VARIATION_ONE);
    } catch (err: any) {
      expect(err.message).toBe(
        "Incorrect Type For 'matches', Must Be Boolean."
      );
      expect(err).toBeInstanceOf(TypeError);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throw Error For Regex If Instantiated Incorrectly [ARG TWO].", async () => {
    try {
      await schema.build(INCORRECT_TYPE_REGEX_VARIATION_TWO);
    } catch (err: any) {
      expect(err.message).toBe(
        "Incorrect Type For 'matches', Must Be Regex Instantiated By new RegExp()' Constructor."
      );
      expect(err).toBeInstanceOf(TypeError);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws Error For Regex If Instantiated Incorrectly [ARG THREE].", async () => {
    try {
      await schema.build(INCORRECT_TYPE_REGEX_VARIATION_THREE);
    } catch (err: any) {
      expect(err.message).toBe(
        "Incorrect Type For Error Message: matches, Must Be A String."
      );
      expect(err).toBeInstanceOf(TypeError);
    }
    expect(schema.peek()).toMatchObject(EXPECTED_DEMO_SCHEMA);
  });
  test("Throws No Error And Successfully Builds The Schema.", () => {
    schema.build(CORRECT_SCHEMA);
    const result = schema.peek();
    expect(result).toMatchObject(EXPECT_SCHEMA);
  });
  test("Throws Error If No Arguments Are Passed In Validate Function.", async () => {
    try {
      await schema.validate();
    } catch (err: any) {
      expect(err.message).toBe("Cannot Submit Empty Payload.");
      expect(err).toBeInstanceOf(Error);
    }
  });
  test("Throws Error If Schema Does Not Include A Property That Was Submitted In The Payload.", async () => {
    try {
      expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
      await schema.validate(EXTRANEOUS_PROPERTY_INSTANCE);
    } catch (err: any) {
      expect(err.message).toBe("Schema Does Not Include Property: helloWorld.");
    }
    expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
  });
  test("Throws Error If There Is A Missing Field On Client Side That Is In The Schema.", async () => {
    try {
      expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
      await schema.validate(INSUFFICIENT_PAYLOAD_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        {
          field: "fullName",
          min: "Full Name Must Not Be Less Than 5 Characters.",
          required: "Full Name Required.",
        },
        { field: "email", email: "Must Be A Valid Email." },
        {
          field: "password",
          min: "Password Must Be Longer Than 8.",
          password:
            "Must Be A Strong Password: containing uppercase, number, and lowercase.",
        },
        {
          field: "age",
          min: "Must Be Older Than 18",
          number: "Age Must Be A Number.",
          required: "Age Required.",
        },
        {
          field: "created_at",
          date: "Must Be A Valid Date.",
          required: "Timestamp Required",
        },
        {
          field: "username",
          min: "Username Must Be Longer Than 5 Characters.",
          matches:
            "Username Must Contain A Number, A Lowercase, and Uppercase Letter.",
          required: "Username Required.",
        },
      ]);
    }
  });
  test("Ensures That Data Is Validated And No Error Message Is Sent If Schema Is Correct.", async () => {
    try {
      const result = await schema.validate(CORRECT_PAYLOAD);
      expect(result).toBeFalsy();
      expect(result).toBeUndefined();
    } catch (err: any) {}
    expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
  });
  test("Ensures That If A Property Is Missing From The Actual Payload, It Throws An Error.", async () => {
    expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
    try {
      await schema.validate(OMITTED_PAYLOAD_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        {
          field: "fullName",
          min: "Full Name Must Not Be Less Than 5 Characters.",
          required: "Full Name Required.",
        },
        { field: "email", required: "Email Required." },
        { field: "password", required: "Password Required." },
        { field: "age", required: "Age Required." },
        { field: "created_at", required: "Timestamp Required" },
        { field: "username", required: "Username Required." },
      ]);
    }
  });
  test("Ensures That Correct Payload Yields No Error.", async () => {
    try {
      const result = await schema.validate(CORRECT_PAYLOAD);
      expect(result).toBeUndefined();
    } catch (err: any) {}
    expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
  });
  test("Throws Error On Min Constraint.", async () => {
    try {
      const result = await schema.validate(INCORRECT_PAYLOAD_MIN_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "age", min: "Must Be Older Than 18" },
      ]);
    }
  });
  test("Throws Error On Max Constraint.", async () => {
    try {
      const result = await schema.validate(INCORRECT_PAYLOAD_MAX_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "age", max: "age Must Be Less Than 120," },
      ]);
    }
  });
  test("Throws Error On Type Constraint.", async () => {
    try {
      const result = await schema.validate(INCORRECT_PAYLOAD_PASSWORD_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        {
          field: "password",
          password:
            "Must Be A Strong Password: containing uppercase, number, and lowercase.",
        },
      ]);
    }
  });
  test("Throws Error On Email Constraint.", async () => {
    try {
      const result = await schema.validate(INCORRECT_PAYLOAD_EMAIL_INSTANCE);
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "email", email: "Must Be A Valid Email." },
        { field: "age", min: "Must Be Older Than 18" },
      ]);
    }
  });
  test("Throws No Error On Correct Submission.", async () => {
    try {
      const result = await schema.validate(CORRECT_PAYLOAD);
      expect(result).toBeUndefined();
    } catch (err: any) {
    }
    expect(schema.peekError()).toMatchObject(EXPECTED_ERROR_OBJECT);
  });
});
