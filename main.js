var SchemaBuidler = require("./index");
var schema = new SchemaBuidler();
schema.build({
    fullName: { string: true }
});
