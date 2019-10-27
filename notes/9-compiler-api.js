"use strict";
exports.__esModule = true;
var path = require("path");
var ts = require("typescript");
function isDefined(x) {
    return typeof x !== "undefined";
}
// (1) Create the program
var program = ts.createProgram({
    options: {
        target: ts.ScriptTarget.ESNext
    },
    rootNames: [
        // path to ../examples/hello-ts/src/index.ts
        path.join(__dirname, "..", "examples", "hello-ts", "src", "index.ts")
    ]
});
// // (2) Get the non-declaration (.d.ts) source files (.ts)
var nonDeclFiles = program
    .getSourceFiles()
    .filter(function (sf) { return !sf.isDeclarationFile; });
// // (3) get the type-checker
var checker = program.getTypeChecker();
/**
 * (4) use the type checker to obtain the
 * -   appropriate ts.Symbol for each SourceFile
 */
var sfSymbols = nonDeclFiles
    .map(function (f) { return checker.getSymbolAtLocation(f); })
    .filter(isDefined); // here's the type guard to filter out undefined
// (5) for each SourceFile Symbol
sfSymbols.forEach(function (sfSymbol) {
    var fileExports = sfSymbol.exports;
    console.log(sfSymbol.name);
    if (fileExports) {
        // - if there are exports
        console.log("== Exports ==");
        fileExports.forEach(function (value, key) {
            // - for each export
            console.log(key, // - log its name
            // - and its type (stringified)
            checker.typeToString(checker.getTypeAtLocation(value.valueDeclaration)));
            var jsDocTags = value.getJsDocTags();
            if (jsDocTags.length > 0) {
                // - if there are JSDoc comment tags
                console.log(
                // - log them out as key-value pairs
                jsDocTags.map(function (tag) { return "\t" + tag.name + ": " + tag.text; }).join("\n"));
            }
        });
    }
});
