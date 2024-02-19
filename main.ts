const SchemaBuidler = require("./index");

const schema = new SchemaBuidler();

schema.build({
    fullName: {string: true, required: 'asashajhs'},
})
