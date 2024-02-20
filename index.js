var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//main class
var SchemaBuilder = /** @class */ (function () {
    function SchemaBuilder() {
        //password regex
        this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        //email regex
        this.emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
        //initialization as private to ensure no outside access
        //initialization default_type in order to allow easy reset later
        this.error = {
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
        };
        this.errorStorage = [
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
        this.default_type = {
            required: true,
            min: -1,
            max: -1,
            matches: new RegExp(""),
            string: false,
            number: false,
            boolean: false,
            date: false,
            email: false,
            password: false,
        };
        this.schema = { demo: this.default_type };
        //setting options
        this.options = this.default_type;
    }
    //main builder function
    SchemaBuilder.prototype.build = function (user_input) {
        var _a;
        var _this = this;
        for (var input in user_input) {
            //ensuring no keys in userinput vary from keys in options
            var keys = Object.keys(user_input[input]);
            keys.forEach(function (n) {
                if (!(n in _this.options)) {
                    throw new Error("Key Not Found In Schema Builder Type: ".concat(n));
                }
            });
            //now switch statement for type checking
            for (var option in user_input[input]) {
                switch (option) {
                    case "email":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "password":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "string":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "required":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "number":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "date":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "boolean":
                        if (typeof user_input[input][option] !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        break;
                    case "min":
                        if (typeof user_input[input][option] !== "number") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Number."));
                        }
                        break;
                    case "max":
                        if (typeof user_input[input][option] !== "number") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Number."));
                        }
                        break;
                    case "matches":
                        if (typeof user_input[input][option] !== "object" &&
                            user_input[input][option] instanceof RegExp) {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Regex Instantiated By new RegExp()' Constructor."));
                        }
                        break;
                }
            }
            //this is grabbing the 4 data types where the input can only be one not one or more
            //then it is returning 0 if more than one data type is checked or 1 if only one is
            var _b = user_input[input], number = _b.number, boolean = _b.boolean, date = _b.date, string = _b.string, email = _b.email, password = _b.password;
            var dataTypesAreUnique = [number, boolean, date, string, email, password].filter(function (n) { return n; })
                .length > 1
                ? 0
                : 1;
            if (dataTypesAreUnique === 0) {
                throw new Error("Type Assignment Error: Can Only Assign One Data Type Constraint.");
            }
        }
        //last thing, creating the final schema with all of the missing pieces that mightve been omitted
        for (var option in this.options) {
            for (var property in user_input) {
                if (!user_input[property].hasOwnProperty(option)) {
                    user_input[property] = __assign(__assign({}, user_input[property]), (_a = {}, _a[option] = this.options[option], _a));
                }
            }
        }
        this.schema = user_input;
    };
    SchemaBuilder.prototype.createErrorObject = function (rule, key, errorMessage) {
        var _a;
        var errorPartOne = __assign(__assign({}, this.error), (_a = {}, _a[rule] = errorMessage, _a.field = key, _a));
        return errorPartOne;
    };
    SchemaBuilder.prototype.addErrorToList = function (error) {
        this.errorStorage.push(error);
    };
    SchemaBuilder.prototype.validateSingleKey = function (key) {
        return this.schema.hasOwnProperty(key);
    };
    SchemaBuilder.prototype.validateSingleType = function (fieldKey, fieldValue) {
        var ruleSet = this.schema[fieldKey];
        for (var rule in ruleSet) {
            switch (rule) {
                case "string":
                    if (ruleSet[rule]) {
                        if (typeof fieldValue !== "string") {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be String."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "number":
                    if (ruleSet[rule]) {
                        if (typeof fieldValue !== "number") {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be Number."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "date":
                    if (ruleSet[rule]) {
                        if (fieldValue instanceof Date) {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be Date."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "boolean":
                    if (ruleSet[rule]) {
                        if (typeof fieldValue !== "boolean") {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be Boolean."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "email":
                    if (ruleSet[rule]) {
                        if (!this.emailRegex.test(fieldValue)) {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be A Valid Email."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "password":
                    if (ruleSet[rule]) {
                        if (!this.passwordRegex.test(fieldValue)) {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Must Be A Strong Password."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "min":
                    if (ruleSet[rule] !== -1) {
                        var trimmedValue_1 = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        if ((isNaN(trimmedValue_1) && trimmedValue_1.length < ruleSet[rule]) ||
                            trimmedValue_1 < ruleSet[rule]) {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, isNaN(fieldValue)
                                ? "".concat(fieldKey, " Must Be A Length Greater Than ").concat(ruleSet[rule], " Characters.")
                                : "".concat(fieldKey, " Must Be Greater Than ").concat(ruleSet[rule], "."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "max":
                    if (ruleSet[rule] !== -1) {
                        var trimmedValue_2 = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        if ((isNaN(trimmedValue_2) && trimmedValue_2.length > ruleSet[rule]) ||
                            trimmedValue_2 > ruleSet[rule]) {
                            var errorToInsert = this.createErrorObject(rule, fieldKey, isNaN(fieldValue)
                                ? "".concat(fieldKey, " Must Be A Length Less Than ").concat(ruleSet[rule], " Characters.")
                                : "".concat(fieldKey, " Must Be Less Than ").concat(ruleSet[rule], "."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "matches":
                    var trimmedValue = isNaN(fieldValue)
                        ? fieldValue.trim()
                        : fieldValue;
                    if (!ruleSet[rule].test(trimmedValue)) {
                        var errorToInsert = this.createErrorObject(rule, fieldKey, "".concat(fieldKey, " Does Not Contain Correct Patterns. ").concat(ruleSet[rule], "."));
                        this.addErrorToList(errorToInsert);
                    }
                    break;
            }
        }
    };
    SchemaBuilder.prototype.validate = function (user_input) {
        //first need to loop through given input, this could be an entire payload after a user clicks a button
        //this loop validates that there are no extraneous properties on the user payload that do not align with the schema
        for (var property in user_input) {
            if (!this.validateSingleKey(property)) {
                throw new Error("Schema Does Not Include Property: ".concat(property, "."));
            }
        }
        //this ensures that the input has all of the properties that were required by the schema
        for (var s in this.schema) {
            if (this.schema[s].required) {
                if (!user_input.hasOwnProperty(s)) {
                    var errorToInsert = this.createErrorObject(s, s, "".concat(s, " Field Is Required."));
                    this.addErrorToList(errorToInsert);
                }
            }
        }
        //now i am going to validate the types z(f(x))
        for (var property in user_input) {
            this.validateSingleType(property, user_input[property]);
        }
        throw this.errorStorage.slice(1);
    };
    SchemaBuilder.prototype.peek = function () {
        return this.schema;
    };
    return SchemaBuilder;
}());
module.exports = SchemaBuilder;
