const Schema = require("../index");
const schema = new Schema();

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
  
});
