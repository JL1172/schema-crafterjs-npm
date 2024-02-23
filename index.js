/*
 * Copyright (c) [2024] [Jacob Lang]
 * SPDX-License-Identifier: ISC
*/
"use strict";
class SchemaBuilder {
    constructor() {
        this.passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        this.emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
        this.defaultError = {
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
        this.schema = {
            demo: this.default_type,
        };
        this.options = this.default_type;
    }
    build(user_input) {
        if (!user_input) {
            throw new Error("This Method Requires An Argument.");
        }
        for (const input in user_input) {
            const keys = Object.keys(user_input[input]);
            keys.forEach((n) => {
                if (!(n in this.options)) {
                    throw new Error(`Key Not Found In Schema Builder Type: ${n}`);
                }
            });
            for (const option in user_input[input]) {
                switch (option) {
                    case "email":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "password":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "string":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "required":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "number":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "date":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "boolean":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "min":
                        if (typeof user_input[input][option]?.[0] !== "number") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Number.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "max":
                        if (typeof user_input[input][option]?.[0] !== "number") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Number.`);
                        }
                        if (typeof user_input[input][option]?.[1] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                    case "matches":
                        if (typeof user_input[input][option]?.[0] !== "boolean") {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Boolean.`);
                        }
                        if (!(user_input[input][option]?.[1] instanceof RegExp)) {
                            throw new TypeError(`Incorrect Type For '${option}', Must Be Regex Instantiated By new RegExp()' Constructor.`);
                        }
                        if (typeof user_input[input][option]?.[2] !== "string") {
                            throw new TypeError(`Incorrect Type For Error Message: ${option}, Must Be A String.`);
                        }
                        break;
                }
            }
            const { number, boolean, date, string, email, password } = user_input[input];
            const dataTypesAreUnique = [
                number?.[0],
                boolean?.[0],
                date?.[0],
                string?.[0],
                email?.[0],
                password?.[0],
            ].filter((n) => n).length > 1
                ? 0
                : 1;
            if (dataTypesAreUnique === 0) {
                throw new Error("Type Assignment Error: Can Only Assign One Data Type Constraint.");
            }
        }
        for (const option in this.options) {
            for (const property in user_input) {
                if (!user_input[property].hasOwnProperty(option)) {
                    user_input[property] = {
                        ...user_input[property],
                        [option]: this.options[option],
                    };
                }
            }
        }
        this.schema = user_input;
    }
    createErrorObject(rule, key, errorMessage) {
        const errorPartOne = { ...this.error, [rule]: errorMessage, field: key };
        return errorPartOne;
    }
    addErrorToList(error) {
        const entries = Object.entries(error).filter((n) => n[0] !== "field" && n[1]);
        const index = this.errorStorage.findIndex((n) => n.field === error.field);
        if (index !== -1) {
            this.errorStorage[index] = {
                ...this.errorStorage[index],
                [entries[0][0]]: entries[0][1],
            };
        }
        else {
            this.errorStorage.push(error);
        }
    }
    validateSingleKey(key) {
        return this.schema.hasOwnProperty(key);
    }
    validateSingleType(fieldKey, fieldValue) {
        const ruleSet = this.schema[fieldKey];
        for (const rule in ruleSet) {
            switch (rule) {
                case "string":
                    if (ruleSet[rule]?.[0]) {
                        if (typeof fieldValue !== "string") {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be String.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "number":
                    if (ruleSet[rule]?.[0]) {
                        if (typeof fieldValue !== "number") {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be Number.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "date":
                    if (ruleSet[rule]?.[0]) {
                        if (!(fieldValue instanceof Date)) {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be Date.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "boolean":
                    if (ruleSet[rule]?.[0]) {
                        if (typeof fieldValue !== "boolean") {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be Boolean.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "email":
                    if (ruleSet[rule]?.[0]) {
                        if (!this.emailRegex.test(fieldValue)) {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be A Valid Email.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "password":
                    if (ruleSet[rule]?.[0]) {
                        if (!this.passwordRegex.test(fieldValue)) {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message ? message : `${fieldKey} Must Be A Strong Password.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "min":
                    if (ruleSet[rule]?.[0] !== -1) {
                        const trimmedValue = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        const minRule = ruleSet[rule]?.[0];
                        if ((minRule &&
                            isNaN(trimmedValue) &&
                            trimmedValue.length < minRule) ||
                            (minRule && trimmedValue < minRule)) {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message
                                ? message
                                : isNaN(fieldValue)
                                    ? `${fieldKey} Must Be A Length Greater Than ${ruleSet[rule]} Characters.`
                                    : `${fieldKey} Must Be Greater Than ${ruleSet[rule]}.`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "max":
                    if (ruleSet && ruleSet[rule]?.[0] !== -1) {
                        const trimmedValue = isNaN(fieldValue)
                            ? fieldValue.trim()
                            : fieldValue;
                        const maxRule = ruleSet[rule]?.[0];
                        if ((maxRule &&
                            isNaN(trimmedValue) &&
                            trimmedValue.length > maxRule) ||
                            (maxRule && trimmedValue > maxRule)) {
                            const message = ruleSet[rule]?.[1];
                            const errorToInsert = this.createErrorObject(rule, fieldKey, message
                                ? message
                                : isNaN(fieldValue)
                                    ? `${fieldKey} Must Be A Length Less Than ${ruleSet[rule]} Characters.`
                                    : `${fieldKey} Must Be Less Than ${ruleSet[rule]}`);
                            this.addErrorToList(errorToInsert);
                        }
                    }
                    break;
                case "matches":
                    const trimmedValue = isNaN(fieldValue)
                        ? fieldValue.trim()
                        : fieldValue;
                    const regIsOccupied = ruleSet[rule]?.[0];
                    const reg = ruleSet[rule]?.[1];
                    if (regIsOccupied && !(reg && reg.test(trimmedValue))) {
                        const message = ruleSet[rule]?.[2];
                        const errorToInsert = this.createErrorObject(rule, fieldKey, message
                            ? message
                            : `${fieldKey} Does Not Contain Correct Patterns. ${ruleSet[rule]?.[0]}.`);
                        this.addErrorToList(errorToInsert);
                    }
                    break;
            }
        }
    }
    validate(user_input) {
        this.errorStorage = [this.defaultError];
        if (!user_input) {
            throw new Error("Cannot Submit Empty Payload.");
        }
        for (const property in user_input) {
            if (!this.validateSingleKey(property)) {
                throw new Error(`Schema Does Not Include Property: ${property}.`);
            }
        }
        for (const s in this.schema) {
            if (this.schema[s].required?.[0]) {
                const message = this.schema[s].required?.[1];
                if (!user_input.hasOwnProperty(s) ||
                    (user_input.hasOwnProperty(s) && !user_input[s])) {
                    const errorToInsert = this.createErrorObject(s, s, message ? message : `${s} Field Is Required.`);
                    this.addErrorToList(errorToInsert);
                }
            }
        }
        for (const property in user_input) {
            this.validateSingleType(property, user_input[property]);
        }
        let trimmedErrorObject = [];
        for (const err in this.errorStorage) {
            const entries = Object.entries(this.errorStorage[err]);
            const filteredEntries = Object.fromEntries(entries.filter((n, i) => n[1]));
            trimmedErrorObject = [...trimmedErrorObject, filteredEntries];
        }
        if (trimmedErrorObject.slice(1).length > 0) {
            throw trimmedErrorObject.slice(1);
        }
        else {
            return;
        }
    }
    peek() {
        return this.schema;
    }
    peekError() {
        return this.errorStorage;
    }
}
module.exports = SchemaBuilder;
//# sourceMappingURL=index.js.map