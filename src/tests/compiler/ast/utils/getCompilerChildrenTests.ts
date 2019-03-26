import { expect } from "chai";
import { getCompilerForEachChildren } from "../../../../compiler/ast/utils";
import { SyntaxKind } from "../../../../typescript";
import { getInfoFromText } from "../../testHelpers";

describe(nameof(getCompilerForEachChildren), () => {
    it("should include extended comments", () => {
        const { sourceFile } = getInfoFromText("//a\nclass Test {} //b\n/*c*/\n/*d*/interface Interface {}\n//e");
        const result = getCompilerForEachChildren(sourceFile.compilerNode, sourceFile.compilerNode);
        expect(result.map(r => r.kind)).to.deep.equal([
            SyntaxKind.SingleLineCommentTrivia,
            SyntaxKind.ClassDeclaration,
            SyntaxKind.MultiLineCommentTrivia,
            SyntaxKind.InterfaceDeclaration,
            SyntaxKind.SingleLineCommentTrivia,
            SyntaxKind.EndOfFileToken
        ]);
    });
});