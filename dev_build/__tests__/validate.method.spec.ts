const SCrafter = require("../schema-builder-class/schema-builder-class");

const correctSchemaToInsertOne = {
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
    required: [true, "Age Is Required."],
    min: [18, "Must Be Older Than 18."],
  },
};

const craftedSchema = new SCrafter();
craftedSchema.build(correctSchemaToInsertOne);
describe("Testing The Validate Method.", () => {
  test("Test The First Error: [Cannot Submit Empty Payload.].", async () => {
    try {
      await craftedSchema.validate();
    } catch (err: any) {
      expect(err.message).toBe("Cannot Submit Empty Payload.");
    }
  });
  test("Test The Second Error: [Schema Does Not Include Property]", async () => {
    try {
      await craftedSchema.validate({ helloWorld: "helloWorld" });
    } catch (err: any) {
      expect(err.message).toBe("Schema Does Not Include Property: helloWorld.");
    }
  });
  test("Test The Third Error: [Field Is Required on Password Field]", async () => {
    try {
      await craftedSchema.validate({
        fullName: "jacob",
        email: "jacoblang127@gmail.com",
        age: 18,
      });
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "password", required: "Password Required." },
      ]);
    }
  });
  test("Test The Third Error: [Field Is Required on FullName Field]", async () => {
    try {
      await craftedSchema.validate({
        password: "helloWorld11",
        email: "jacoblang127@gmail.com",
        age: 18,
      });
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "fullName", required: "Full Name Required." },
      ]);
    }
  });
  test("Test The Third Error: [Field Is Required on Email Field]", async () => {
    try {
      await craftedSchema.validate({
        password: "helloWorld11",
        fullName: "jacob lang",
        age: 18,
      });
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "email", required: "Email Required." },
      ]);
    }
  });
  test("Test The Third Error: [Field Is Required on Age Field]", async () => {
    try {
      await craftedSchema.validate({
        password: "helloWorld11",
        fullName: "jacob lang",
        email: "jacoblang@me.com",
      });
    } catch (err: any) {
      expect(err).toMatchObject([
        { field: "age", required: "Age Is Required." },
      ]);
    }
  });
  test("Test The Third Error: [Field Is Required] Leaving All Of The Values As Empty Strings", async () => {
    try {
      await craftedSchema.validate({
        password: "    ",
        fullName: "     ",
        email: "     ",
        age: "       ",
      });
    } catch (err: any) {
      expect(err).toMatchObject([
        {
          field: "fullName",
          required: "Full Name Required.",
          min: "Full Name Must Not Be Less Than 5 Characters.",
        },
        {
          field: "email",
          required: "Email Required.",
          email: "Must Be A Valid Email.",
        },
        {
          field: "password",
          required: "Password Required.",
          min: "Password Must Be Longer Than 8.",
          password:
            "Must Be A Strong Password: containing uppercase, number, and lowercase.",
        },
        {
          field: "age",
          required: "Age Is Required.",
          min: "Must Be Older Than 18.",
          number: "Age Must Be A Number.",
        },
      ]);
    }
  });
});
