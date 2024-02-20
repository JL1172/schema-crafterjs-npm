"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
//this is the only class in this package
var SchemaBuilder = /** @class */ (function () {
    function SchemaBuilder() {
        //password regex
        this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        //email regex
        this.emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
        //the error type that exists within the errorstorage array as such ErrorType[]
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
        //initialization default_type in order to allow easy reset later
        this.default_type = {
            required: [true, ""],
            min: [-1, ""],
            max: [-1, ""],
            matches: [false, new RegExp(""), ""],
            string: [false, ""],
            number: [false, ""],
            boolean: [false, ""],
            date: [false, ""],
            email: [false, ""],
            password: [false, ""],
        };
        //this is the main schema that is carried along the entire process, there is a place holder that has all default values
        this.schema = {
            demo: this.default_type,
        };
        //setting options
        this.options = this.default_type;
    }
    //main builder function
    SchemaBuilder.prototype.build = function (user_input) {
        var _a;
        var _this = this;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        for (var input in user_input) {
            //ensuring no keys in userinput vary from keys in options, making sure no errors, etc.
            var keys = Object.keys(user_input[input]);
            keys.forEach(function (n) {
                if (!(n in _this.options)) {
                    throw new Error("Key Not Found In Schema Builder Type: ".concat(n));
                }
            });
            //now switch statement for type checking, this ensures that the options set, all have correct types they are set to
            for (var option in user_input[input]) {
                switch (option) {
                    case "email":
                        if (typeof ((_b = user_input[input][option]) === null || _b === void 0 ? void 0 : _b[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_c = user_input[input][option]) === null || _c === void 0 ? void 0 : _c[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "password":
                        if (typeof ((_d = user_input[input][option]) === null || _d === void 0 ? void 0 : _d[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_e = user_input[input][option]) === null || _e === void 0 ? void 0 : _e[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "string":
                        if (typeof ((_f = user_input[input][option]) === null || _f === void 0 ? void 0 : _f[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_g = user_input[input][option]) === null || _g === void 0 ? void 0 : _g[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "required":
                        if (typeof ((_h = user_input[input][option]) === null || _h === void 0 ? void 0 : _h[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_j = user_input[input][option]) === null || _j === void 0 ? void 0 : _j[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "number":
                        if (typeof ((_k = user_input[input][option]) === null || _k === void 0 ? void 0 : _k[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_l = user_input[input][option]) === null || _l === void 0 ? void 0 : _l[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "date":
                        if (typeof ((_m = user_input[input][option]) === null || _m === void 0 ? void 0 : _m[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_o = user_input[input][option]) === null || _o === void 0 ? void 0 : _o[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "boolean":
                        if (typeof ((_p = user_input[input][option]) === null || _p === void 0 ? void 0 : _p[0]) !== "boolean") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Boolean."));
                        }
                        if (typeof ((_q = user_input[input][option]) === null || _q === void 0 ? void 0 : _q[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "min":
                        if (typeof ((_r = user_input[input][option]) === null || _r === void 0 ? void 0 : _r[0]) !== "number") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Number."));
                        }
                        if (typeof ((_s = user_input[input][option]) === null || _s === void 0 ? void 0 : _s[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "max":
                        if (typeof ((_t = user_input[input][option]) === null || _t === void 0 ? void 0 : _t[0]) !== "number") {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Number."));
                        }
                        if (typeof ((_u = user_input[input][option]) === null || _u === void 0 ? void 0 : _u[1]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                    case "matches":
                        if (typeof ((_v = user_input[input][option]) === null || _v === void 0 ? void 0 : _v[0]) !== "boolean" &&
                            ((_w = user_input[input][option]) === null || _w === void 0 ? void 0 : _w[1]) instanceof RegExp) {
                            throw new TypeError("Incorrect Type For '".concat(option, "', Must Be Regex Instantiated By new RegExp()' Constructor."));
                        }
                        if (typeof ((_x = user_input[input][option]) === null || _x === void 0 ? void 0 : _x[2]) !== "string") {
                            throw new TypeError("Incorrect Type For Error Message: ".concat(option, ", Must Be A String."));
                        }
                        break;
                }
            }
            //this is grabbing the 6 data types where the input can only be one not one or more then it is returning 0 if more than one data type is checked or 1 if only one is
            var _y = user_input[input], number = _y.number, boolean = _y.boolean, date = _y.date, string = _y.string, email = _y.email, password = _y.password;
            var dataTypesAreUnique = [
                number === null || number === void 0 ? void 0 : number[0],
                boolean === null || boolean === void 0 ? void 0 : boolean[0],
                date === null || date === void 0 ? void 0 : date[0],
                string === null || string === void 0 ? void 0 : string[0],
                email === null || email === void 0 ? void 0 : email[0],
                password === null || password === void 0 ? void 0 : password[0],
            ].filter(function (n) { return n; }).length > 1
                ? 0
                : 1;
            if (dataTypesAreUnique === 0) {
                throw new Error("Type Assignment Error: Can Only Assign One Data Type Constraint.");
            }
        }
        //last thing, creating the final schema with all of the missing pieces that mightve been omitted, this is for consistency later down the line
        //first loop loops through the options
        for (var option in this.options) {
            //second loop loops through the properties in the user input fullName, username, etc.
            for (var property in user_input) {
                //it is reconciling if userinput[property] (fullName: {string: true}) has all the necessary "meta" configuration,
                if (!user_input[property].hasOwnProperty(option)) {
                    //if it doesn't it adds the property, by assigning user_input to shallow copy with that option dynamically added to the default value
                    user_input[property] = __assign(__assign({}, user_input[property]), (_a = {}, _a[option] = this.options[option], _a));
                }
            }
        }
        //on success the schema object now is assigned to the validated and modified schema that can now be processed
        this.schema = user_input;
    };
    //these are all util functions
    //this just packages the error into a nice presentable object and returns it
    SchemaBuilder.prototype.createErrorObject = function (rule, key, errorMessage) {
        var _a;
        var errorPartOne = __assign(__assign({}, this.error), (_a = {}, _a[rule] = errorMessage, _a.field = key, _a));
        return errorPartOne;
    };
    //this is a setter method that adds the error to the errorStorage object which is inevitably returned to the user at the end of all of this
    SchemaBuilder.prototype.addErrorToList = function (error) {
        this.errorStorage.push(error);
    };
    //this validates that the schema has a one to one replica per-se of the keys in the given payload
    SchemaBuilder.prototype.validateSingleKey = function (key) {
        return this.schema.hasOwnProperty(key);
    };
    //this validates the types of the payload
    //this is the true validation function, that takes in the fieldKey name so fullName and its value and validates its type against the constraints written on the schema
    SchemaBuilder.prototype.validateSingleType = function (fieldKey, fieldValue) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        //these are the rules or constraints of each inputted fieldkey
        var ruleSet = this.schema[fieldKey];
        //now it loops through the rules or constraints
        for (var rule in ruleSet) {
            //start of switch case looping through the rules, string, date, min, password etc.
            //if the constraint is not met, it calls on the createErrorObject method to create an error object then adds it to the errorStorage array
            switch (rule) {
                case "string":
                    if ((_a = ruleSet[rule]) === null || _a === void 0 ? void 0 : _a[0]) {
                        if (typeof fieldValue !== "string") {
                            var message = (_b = ruleSet[rule]) === null || _b === void 0 ? void 0 : _b[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be String."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "number":
                    if ((_c = ruleSet[rule]) === null || _c === void 0 ? void 0 : _c[0]) {
                        if (typeof fieldValue !== "number") {
                            var message = (_d = ruleSet[rule]) === null || _d === void 0 ? void 0 : _d[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be Number."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "date":
                    if ((_e = ruleSet[rule]) === null || _e === void 0 ? void 0 : _e[0]) {
                        if (!(fieldValue instanceof Date)) {
                            var message = (_f = ruleSet[rule]) === null || _f === void 0 ? void 0 : _f[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be Date."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "boolean":
                    if ((_g = ruleSet[rule]) === null || _g === void 0 ? void 0 : _g[0]) {
                        if (typeof fieldValue !== "boolean") {
                            var message = (_h = ruleSet[rule]) === null || _h === void 0 ? void 0 : _h[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be Boolean."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "email":
                    if ((_j = ruleSet[rule]) === null || _j === void 0 ? void 0 : _j[0]) {
                        if (!this.emailRegex.test(fieldValue)) {
                            var message = (_k = ruleSet[rule]) === null || _k === void 0 ? void 0 : _k[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be A Valid Email."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "password":
                    if ((_l = ruleSet[rule]) === null || _l === void 0 ? void 0 : _l[0]) {
                        if (!this.passwordRegex.test(fieldValue)) {
                            var message = (_m = ruleSet[rule]) === null || _m === void 0 ? void 0 : _m[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : "".concat(fieldKey, " Must Be A Strong Password."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "min":
                    //this case is different but not too much
                    //it first checks if the val is a number, if it isn't it is trimmed, else: not
                    if (((_o = ruleSet[rule]) === null || _o === void 0 ? void 0 : _o[0]) !== -1) {
                        var trimmedValue_1 = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        var minRule = (_p = ruleSet[rule]) === null || _p === void 0 ? void 0 : _p[0];
                        //this is ensuring minrule is truthy, and if it is and it is nan and trimmed.lenght is less then minRule of ruleset[rule] or if minrule is truthy and its greater than the trimmedvalu then it throws an error, maxRule is also the same
                        if ((minRule &&
                            isNaN(trimmedValue_1) &&
                            trimmedValue_1.length < minRule) ||
                            (minRule && trimmedValue_1 < minRule)) {
                            var message = (_q = ruleSet[rule]) === null || _q === void 0 ? void 0 : _q[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message
                                ? message
                                : isNaN(fieldValue)
                                    ? "".concat(fieldKey, " Must Be A Length Greater Than ").concat(ruleSet[rule], " Characters.")
                                    : "".concat(fieldKey, " Must Be Greater Than ").concat(ruleSet[rule], "."));
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "max":
                    if (ruleSet && ((_r = ruleSet[rule]) === null || _r === void 0 ? void 0 : _r[0]) !== -1) {
                        var trimmedValue_2 = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        var maxRule = (_s = ruleSet[rule]) === null || _s === void 0 ? void 0 : _s[0];
                        if ((maxRule &&
                            isNaN(trimmedValue_2) &&
                            trimmedValue_2.length > maxRule) ||
                            (maxRule && trimmedValue_2 > maxRule)) {
                            var message = (_t = ruleSet[rule]) === null || _t === void 0 ? void 0 : _t[1];
                            var errorToInsert = this.createErrorObject(rule, fieldKey, message
                                ? message
                                : isNaN(fieldValue)
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
                    var regIsOccupied = (_u = ruleSet[rule]) === null || _u === void 0 ? void 0 : _u[0];
                    var reg = (_v = ruleSet[rule]) === null || _v === void 0 ? void 0 : _v[1];
                    if (regIsOccupied && !(reg && reg.test(trimmedValue))) {
                        var message = (_w = ruleSet[rule]) === null || _w === void 0 ? void 0 : _w[2];
                        var errorToInsert = this.createErrorObject(rule, fieldKey, message
                            ? message
                            : "".concat(fieldKey, " Does Not Contain Correct Patterns. ").concat((_x = ruleSet[rule]) === null || _x === void 0 ? void 0 : _x[0], "."));
                        this.addErrorToList(errorToInsert);
                    }
                    break;
            }
        }
    };
    //this expects the user input to be once a user submits an entire payload
    SchemaBuilder.prototype.validate = function (user_input) {
        var _a, _b;
        //first need to loop through given input, this could be an entire payload after a user clicks a button
        //this loop validates that there are no extraneous properties on the user payload that do not align with the schema
        for (var property in user_input) {
            if (!this.validateSingleKey(property)) {
                throw new Error("Schema Does Not Include Property: ".concat(property, "."));
            }
        }
        //this ensures that the input has all of the properties that were required by the schema
        for (var s in this.schema) {
            if ((_a = this.schema[s].required) === null || _a === void 0 ? void 0 : _a[0]) {
                var message = (_b = this.schema[s].required) === null || _b === void 0 ? void 0 : _b[1];
                if (!user_input.hasOwnProperty(s)) {
                    var errorToInsert = this.createErrorObject(s, s, message ? message : "".concat(s, " Field Is Required."));
                    this.addErrorToList(errorToInsert);
                }
            }
        }
        //now i am going to validate the types against their constraints pre defined by the schema
        for (var property in user_input) {
            this.validateSingleType(property, user_input[property]);
        }
        //this code below grabs the error object array this.errorStorage;
        //it loops through the storage, takes the entries, filters through them and returns only those errors that are truthy and then makes an object from those entries and then spreads the trimmedErrorObject array and inserts that object in it, then at the end, it throws it
        var trimmedErrorObject = [];
        for (var err in this.errorStorage) {
            var entries = Object.entries(this.errorStorage[err]);
            var filteredEntries = Object.fromEntries(entries.filter(function (n, i) { return n[1]; }));
            trimmedErrorObject = __spreadArray(__spreadArray([], trimmedErrorObject, true), [filteredEntries], false);
        }
        if (trimmedErrorObject.slice(1).length > 0) {
            throw trimmedErrorObject.slice(1);
        }
        else {
            return;
        }
    };
    SchemaBuilder.prototype.peek = function () {
        return this.schema;
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
