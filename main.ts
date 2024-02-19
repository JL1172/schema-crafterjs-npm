const SchemaBuidler = require("./index");

const schema = new SchemaBuidler();

schema.build({
    fullName: {string: true, required: true},
    email: {string: true, required: true, }
})
