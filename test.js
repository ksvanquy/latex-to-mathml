// Test file to verify the package works
const { hello, getTimestamp } = require("./dist/index.js");

console.log("Testing zeditor package...");
console.log("hello():", hello());
console.log('hello("Test"):', hello("Test"));
console.log("getTimestamp():", getTimestamp());
console.log("Package test completed successfully!");
