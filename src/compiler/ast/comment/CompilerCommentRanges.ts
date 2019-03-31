import { ts, SyntaxKind } from "../../../typescript";

export class CompilerExtendedCommentRange implements ts.Node {
    private _start: number;
    private _sourceFile: ts.SourceFile;

    constructor(pos: number, end: number, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, sourceFile: ts.SourceFile, parent: ts.Node) {
        this._start = pos; // pos and start are the same for comments
        this._sourceFile = sourceFile;
        this.pos = pos;
        this.end = end;
        this.kind = kind;
        this.flags = ts.NodeFlags.None;
        this.parent = parent;
    }

    pos: number;
    end: number;
    kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
    flags: ts.NodeFlags;
    decorators?: ts.NodeArray<ts.Decorator> | undefined;
    modifiers?: ts.NodeArray<ts.Modifier> | undefined;
    parent: ts.Node;

    getSourceFile() {
        return this._sourceFile;
    }

    getChildCount(sourceFile?: ts.SourceFile | undefined): number {
        return 0;
    }

    getChildAt(index: number, sourceFile?: ts.SourceFile | undefined) {
        return undefined as any as ts.Node; // the compiler definition is wrong
    }

    getChildren(sourceFile?: ts.SourceFile | undefined): ts.Node[] {
        return [];
    }

    getStart(sourceFile?: ts.SourceFile | undefined, includeJsDocComment?: boolean | undefined) {
        return this._start;
    }

    getFullStart() {
        return this.pos;
    }

    getEnd() {
        return this.end;
    }

    getWidth(sourceFile?: ts.SourceFileLike | undefined) {
        return this.end - this._start;
    }

    getFullWidth(): number {
        return this.end - this.pos;
    }

    getLeadingTriviaWidth(sourceFile?: ts.SourceFile | undefined) {
        return this._start - this.pos;
    }

    getFullText(sourceFile?: ts.SourceFile | undefined) {
        return this._sourceFile.text.substring(this.pos, this.end);
    }

    getText(sourceFile?: ts.SourceFile | undefined) {
        return this._sourceFile.text.substring(this._start, this.end);
    }

    getFirstToken(sourceFile?: ts.SourceFile | undefined): ts.Node | undefined {
        return undefined;
    }

    getLastToken(sourceFile?: ts.SourceFile | undefined): ts.Node | undefined {
        return undefined;
    }

    forEachChild<T>(cbNode: (node: ts.Node) => T | undefined, cbNodeArray?: ((nodes: ts.NodeArray<ts.Node>) => T | undefined) | undefined): T | undefined {
        return undefined;
    }
}

export class CompilerCommentRangeStatement extends CompilerExtendedCommentRange implements ts.Statement {
    _statementBrand: any;
    /** @internal */
    _isCommentRangeStatement: true = true;
}
