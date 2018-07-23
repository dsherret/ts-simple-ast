﻿import Project, {
    FunctionDeclaration, ClassDeclaration, Node, SourceFile, MethodDeclaration, TypeGuards, Decorator,
    EnumDeclaration, EnumMember, ExportDeclaration, ExportSpecifier, ImportDeclaration, ImportSpecifier,
    InterfaceDeclaration, ShorthandPropertyAssignment, SpreadAssignment, ObjectLiteralExpression, ParameterDeclaration,
    Type, Symbol, Signature, TypeFormatFlags, NamespaceDeclaration, Directory, Diagnostic, DiagnosticMessageChain,
    GetAccessorDeclaration, SetAccessorDeclaration, PropertyDeclaration, TypeNode, JSDoc, ExportAssignment,
    ExpressionWithTypeArguments, CallExpression, SyntaxKind, Identifier, VariableDeclaration, ConstructSignatureDeclaration,
    CallSignatureDeclaration, IndexSignatureDeclaration, MethodSignature, PropertySignature, TypeAliasDeclaration,
    NumericLiteral, VariableStatement, VariableDeclarationKind, IndentationText, QuoteKind, ts, createWrappedNode,
    PropertyAccessExpression, LanguageService, Program, TypeChecker, FileSystemHost, TypeParameterDeclaration
} from "../../src/main";
import { expect as Expect } from "chai";

let project: Project, node: Node, classDeclaration: ClassDeclaration, functionDeclaration: FunctionDeclaration,
    sourceFile: SourceFile, method: MethodDeclaration, decorator: Decorator, enumDeclaration: EnumDeclaration,
    enumMember: EnumMember, exportDeclaration: ExportDeclaration, namedExport: ExportSpecifier,
    importDeclaration: ImportDeclaration, namedImport: ImportSpecifier, interfaceDeclaration: InterfaceDeclaration,
    shorthandPropertyAssignment: ShorthandPropertyAssignment, spreadAssignment: SpreadAssignment, objectLiteralExpression: ObjectLiteralExpression,
    parameter: ParameterDeclaration, type: Type, symbol: Symbol, signature: Signature, namespaceDeclaration: NamespaceDeclaration,
    directory: Directory, diagnostic: Diagnostic, dmc: DiagnosticMessageChain, getAccessor: GetAccessorDeclaration,
    setAccessor: SetAccessorDeclaration, propertyDeclaration: PropertyDeclaration, jsDoc: JSDoc, exportAssignment: ExportAssignment,
    expressionWithTypeArgs: ExpressionWithTypeArguments, callExpression: CallExpression, functionOverload: FunctionDeclaration,
    identifier: Identifier, variableDeclaration: VariableDeclaration, constructSignature: ConstructSignatureDeclaration,
    callSignature: CallSignatureDeclaration, indexSignature: IndexSignatureDeclaration, methodSignature: MethodSignature,
    propertySignature: PropertySignature, typeAliasDeclaration: TypeAliasDeclaration, numericLiteral: NumericLiteral,
    variableStatement: VariableStatement, propertyAccessExpression: PropertyAccessExpression, languageService: LanguageService,
    program: Program, typeChecker: TypeChecker, typeParameter: TypeParameterDeclaration, expect: typeof Expect
