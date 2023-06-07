"use strict";
const df = require("durable-functions");
module.exports = df.orchestrator(function* (context) {
    context.log("Starting chain sample");
    const output = [];
    const _result1 = generator1;
    console.log(_result1);
    output.push(_result1);
    // output.push(yield context.df.callActivity("E1_SayHello", "Seattle"));
    // output.push(yield context.df.callActivity("E1_SayHello", "London"));
    return output;
});
/*
  No Error!
  The result of `yield 1` is unused
*/
function* generator1(context) {
    yield context.df.callActivity("E1_SayHello", "Tokyo");
}
//# sourceMappingURL=index.js.map