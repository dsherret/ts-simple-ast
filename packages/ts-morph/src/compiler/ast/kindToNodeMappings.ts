// DO NOT EDIT - Automatically maintained by createKindToNodeMappings.ts
// Edit factories/kindToWrapperMappings.ts then run yarn code-generate instead.
import { SyntaxKind, ts } from "@ts-morph/common";
import * as compiler from "./index";

export interface ImplementedKindToNodeMappings {
    [SyntaxKind.SourceFile]: compiler.SourceFile;
    [SyntaxKind.ArrayBindingPattern]: compiler.ArrayBindingPattern;
    [SyntaxKind.ArrayLiteralExpression]: compiler.ArrayLiteralExpression;
    [SyntaxKind.ArrayType]: compiler.ArrayTypeNode;
    [SyntaxKind.ArrowFunction]: compiler.ArrowFunction;
    [SyntaxKind.AsExpression]: compiler.AsExpression;
    [SyntaxKind.AwaitExpression]: compiler.AwaitExpression;
    [SyntaxKind.BigIntLiteral]: compiler.BigIntLiteral;
    [SyntaxKind.BindingElement]: compiler.BindingElement;
    [SyntaxKind.BinaryExpression]: compiler.BinaryExpression;
    [SyntaxKind.Block]: compiler.Block;
    [SyntaxKind.BreakStatement]: compiler.BreakStatement;
    [SyntaxKind.CallExpression]: compiler.CallExpression;
    [SyntaxKind.CallSignature]: compiler.CallSignatureDeclaration;
    [SyntaxKind.CaseBlock]: compiler.CaseBlock;
    [SyntaxKind.CaseClause]: compiler.CaseClause;
    [SyntaxKind.CatchClause]: compiler.CatchClause;
    [SyntaxKind.ClassDeclaration]: compiler.ClassDeclaration;
    [SyntaxKind.ClassExpression]: compiler.ClassExpression;
    [SyntaxKind.ConditionalType]: compiler.ConditionalTypeNode;
    [SyntaxKind.Constructor]: compiler.ConstructorDeclaration;
    [SyntaxKind.ConstructorType]: compiler.ConstructorTypeNode;
    [SyntaxKind.ConstructSignature]: compiler.ConstructSignatureDeclaration;
    [SyntaxKind.ContinueStatement]: compiler.ContinueStatement;
    [SyntaxKind.CommaListExpression]: compiler.CommaListExpression;
    [SyntaxKind.ComputedPropertyName]: compiler.ComputedPropertyName;
    [SyntaxKind.ConditionalExpression]: compiler.ConditionalExpression;
    [SyntaxKind.DebuggerStatement]: compiler.DebuggerStatement;
    [SyntaxKind.Decorator]: compiler.Decorator;
    [SyntaxKind.DefaultClause]: compiler.DefaultClause;
    [SyntaxKind.DeleteExpression]: compiler.DeleteExpression;
    [SyntaxKind.DoStatement]: compiler.DoStatement;
    [SyntaxKind.ElementAccessExpression]: compiler.ElementAccessExpression;
    [SyntaxKind.EmptyStatement]: compiler.EmptyStatement;
    [SyntaxKind.EnumDeclaration]: compiler.EnumDeclaration;
    [SyntaxKind.EnumMember]: compiler.EnumMember;
    [SyntaxKind.ExportAssignment]: compiler.ExportAssignment;
    [SyntaxKind.ExportDeclaration]: compiler.ExportDeclaration;
    [SyntaxKind.ExportSpecifier]: compiler.ExportSpecifier;
    [SyntaxKind.ExpressionWithTypeArguments]: compiler.ExpressionWithTypeArguments;
    [SyntaxKind.ExpressionStatement]: compiler.ExpressionStatement;
    [SyntaxKind.ExternalModuleReference]: compiler.ExternalModuleReference;
    [SyntaxKind.QualifiedName]: compiler.QualifiedName;
    [SyntaxKind.ForInStatement]: compiler.ForInStatement;
    [SyntaxKind.ForOfStatement]: compiler.ForOfStatement;
    [SyntaxKind.ForStatement]: compiler.ForStatement;
    [SyntaxKind.FunctionDeclaration]: compiler.FunctionDeclaration;
    [SyntaxKind.FunctionExpression]: compiler.FunctionExpression;
    [SyntaxKind.FunctionType]: compiler.FunctionTypeNode;
    [SyntaxKind.GetAccessor]: compiler.GetAccessorDeclaration;
    [SyntaxKind.HeritageClause]: compiler.HeritageClause;
    [SyntaxKind.Identifier]: compiler.Identifier;
    [SyntaxKind.IfStatement]: compiler.IfStatement;
    [SyntaxKind.ImportClause]: compiler.ImportClause;
    [SyntaxKind.ImportDeclaration]: compiler.ImportDeclaration;
    [SyntaxKind.ImportEqualsDeclaration]: compiler.ImportEqualsDeclaration;
    [SyntaxKind.ImportSpecifier]: compiler.ImportSpecifier;
    [SyntaxKind.ImportType]: compiler.ImportTypeNode;
    [SyntaxKind.IndexedAccessType]: compiler.IndexedAccessTypeNode;
    [SyntaxKind.IndexSignature]: compiler.IndexSignatureDeclaration;
    [SyntaxKind.InferType]: compiler.InferTypeNode;
    [SyntaxKind.InterfaceDeclaration]: compiler.InterfaceDeclaration;
    [SyntaxKind.IntersectionType]: compiler.IntersectionTypeNode;
    [SyntaxKind.JSDocAugmentsTag]: compiler.JSDocAugmentsTag;
    [SyntaxKind.JSDocAuthorTag]: compiler.JSDocAuthorTag;
    [SyntaxKind.JSDocCallbackTag]: compiler.JSDocCallbackTag;
    [SyntaxKind.JSDocClassTag]: compiler.JSDocClassTag;
    [SyntaxKind.JSDocDeprecatedTag]: compiler.JSDocDeprecatedTag;
    [SyntaxKind.JSDocEnumTag]: compiler.JSDocEnumTag;
    [SyntaxKind.JSDocFunctionType]: compiler.JSDocFunctionType;
    [SyntaxKind.JSDocImplementsTag]: compiler.JSDocImplementsTag;
    [SyntaxKind.JSDocLink]: compiler.JSDocLink;
    [SyntaxKind.JSDocMemberName]: compiler.JSDocMemberName;
    [SyntaxKind.JSDocOverrideTag]: compiler.JSDocOverrideTag;
    [SyntaxKind.JSDocParameterTag]: compiler.JSDocParameterTag;
    [SyntaxKind.JSDocPrivateTag]: compiler.JSDocPrivateTag;
    [SyntaxKind.JSDocPropertyTag]: compiler.JSDocPropertyTag;
    [SyntaxKind.JSDocProtectedTag]: compiler.JSDocProtectedTag;
    [SyntaxKind.JSDocPublicTag]: compiler.JSDocPublicTag;
    [SyntaxKind.JSDocReturnTag]: compiler.JSDocReturnTag;
    [SyntaxKind.JSDocReadonlyTag]: compiler.JSDocReadonlyTag;
    [SyntaxKind.JSDocSeeTag]: compiler.JSDocSeeTag;
    [SyntaxKind.JSDocSignature]: compiler.JSDocSignature;
    [SyntaxKind.JSDocTag]: compiler.JSDocUnknownTag;
    [SyntaxKind.JSDocTemplateTag]: compiler.JSDocTemplateTag;
    [SyntaxKind.JSDocText]: compiler.JSDocText;
    [SyntaxKind.JSDocThisTag]: compiler.JSDocThisTag;
    [SyntaxKind.JSDocTypeExpression]: compiler.JSDocTypeExpression;
    [SyntaxKind.JSDocTypeTag]: compiler.JSDocTypeTag;
    [SyntaxKind.JSDocTypedefTag]: compiler.JSDocTypedefTag;
    [SyntaxKind.JsxAttribute]: compiler.JsxAttribute;
    [SyntaxKind.JsxClosingElement]: compiler.JsxClosingElement;
    [SyntaxKind.JsxClosingFragment]: compiler.JsxClosingFragment;
    [SyntaxKind.JsxElement]: compiler.JsxElement;
    [SyntaxKind.JsxExpression]: compiler.JsxExpression;
    [SyntaxKind.JsxFragment]: compiler.JsxFragment;
    [SyntaxKind.JsxOpeningElement]: compiler.JsxOpeningElement;
    [SyntaxKind.JsxOpeningFragment]: compiler.JsxOpeningFragment;
    [SyntaxKind.JsxSelfClosingElement]: compiler.JsxSelfClosingElement;
    [SyntaxKind.JsxSpreadAttribute]: compiler.JsxSpreadAttribute;
    [SyntaxKind.JsxText]: compiler.JsxText;
    [SyntaxKind.LabeledStatement]: compiler.LabeledStatement;
    [SyntaxKind.LiteralType]: compiler.LiteralTypeNode;
    [SyntaxKind.MappedType]: compiler.MappedTypeNode;
    [SyntaxKind.MetaProperty]: compiler.MetaProperty;
    [SyntaxKind.MethodDeclaration]: compiler.MethodDeclaration;
    [SyntaxKind.MethodSignature]: compiler.MethodSignature;
    [SyntaxKind.ModuleBlock]: compiler.ModuleBlock;
    [SyntaxKind.ModuleDeclaration]: compiler.ModuleDeclaration;
    [SyntaxKind.NamedExports]: compiler.NamedExports;
    [SyntaxKind.NamedImports]: compiler.NamedImports;
    [SyntaxKind.NamedTupleMember]: compiler.NamedTupleMember;
    [SyntaxKind.NamespaceExport]: compiler.NamespaceExport;
    [SyntaxKind.NamespaceImport]: compiler.NamespaceImport;
    [SyntaxKind.NewExpression]: compiler.NewExpression;
    [SyntaxKind.NonNullExpression]: compiler.NonNullExpression;
    [SyntaxKind.NotEmittedStatement]: compiler.NotEmittedStatement;
    [SyntaxKind.NoSubstitutionTemplateLiteral]: compiler.NoSubstitutionTemplateLiteral;
    [SyntaxKind.NumericLiteral]: compiler.NumericLiteral;
    [SyntaxKind.ObjectBindingPattern]: compiler.ObjectBindingPattern;
    [SyntaxKind.ObjectLiteralExpression]: compiler.ObjectLiteralExpression;
    [SyntaxKind.OmittedExpression]: compiler.OmittedExpression;
    [SyntaxKind.Parameter]: compiler.ParameterDeclaration;
    [SyntaxKind.ParenthesizedExpression]: compiler.ParenthesizedExpression;
    [SyntaxKind.ParenthesizedType]: compiler.ParenthesizedTypeNode;
    [SyntaxKind.PartiallyEmittedExpression]: compiler.PartiallyEmittedExpression;
    [SyntaxKind.PostfixUnaryExpression]: compiler.PostfixUnaryExpression;
    [SyntaxKind.PrefixUnaryExpression]: compiler.PrefixUnaryExpression;
    [SyntaxKind.PrivateIdentifier]: compiler.PrivateIdentifier;
    [SyntaxKind.PropertyAccessExpression]: compiler.PropertyAccessExpression;
    [SyntaxKind.PropertyAssignment]: compiler.PropertyAssignment;
    [SyntaxKind.PropertyDeclaration]: compiler.PropertyDeclaration;
    [SyntaxKind.PropertySignature]: compiler.PropertySignature;
    [SyntaxKind.RegularExpressionLiteral]: compiler.RegularExpressionLiteral;
    [SyntaxKind.ReturnStatement]: compiler.ReturnStatement;
    [SyntaxKind.SetAccessor]: compiler.SetAccessorDeclaration;
    [SyntaxKind.ShorthandPropertyAssignment]: compiler.ShorthandPropertyAssignment;
    [SyntaxKind.SpreadAssignment]: compiler.SpreadAssignment;
    [SyntaxKind.SpreadElement]: compiler.SpreadElement;
    [SyntaxKind.StringLiteral]: compiler.StringLiteral;
    [SyntaxKind.SwitchStatement]: compiler.SwitchStatement;
    [SyntaxKind.SyntaxList]: compiler.SyntaxList;
    [SyntaxKind.TaggedTemplateExpression]: compiler.TaggedTemplateExpression;
    [SyntaxKind.TemplateExpression]: compiler.TemplateExpression;
    [SyntaxKind.TemplateHead]: compiler.TemplateHead;
    [SyntaxKind.TemplateLiteralType]: compiler.TemplateLiteralTypeNode;
    [SyntaxKind.TemplateMiddle]: compiler.TemplateMiddle;
    [SyntaxKind.TemplateSpan]: compiler.TemplateSpan;
    [SyntaxKind.TemplateTail]: compiler.TemplateTail;
    [SyntaxKind.ThisType]: compiler.ThisTypeNode;
    [SyntaxKind.ThrowStatement]: compiler.ThrowStatement;
    [SyntaxKind.TryStatement]: compiler.TryStatement;
    [SyntaxKind.TupleType]: compiler.TupleTypeNode;
    [SyntaxKind.TypeAliasDeclaration]: compiler.TypeAliasDeclaration;
    [SyntaxKind.TypeAssertionExpression]: compiler.TypeAssertion;
    [SyntaxKind.TypeLiteral]: compiler.TypeLiteralNode;
    [SyntaxKind.TypeParameter]: compiler.TypeParameterDeclaration;
    [SyntaxKind.TypePredicate]: compiler.TypePredicateNode;
    [SyntaxKind.TypeReference]: compiler.TypeReferenceNode;
    [SyntaxKind.UnionType]: compiler.UnionTypeNode;
    [SyntaxKind.VariableDeclaration]: compiler.VariableDeclaration;
    [SyntaxKind.VariableDeclarationList]: compiler.VariableDeclarationList;
    [SyntaxKind.VariableStatement]: compiler.VariableStatement;
    [SyntaxKind.JSDocComment]: compiler.JSDoc;
    [SyntaxKind.TypeOfExpression]: compiler.TypeOfExpression;
    [SyntaxKind.WhileStatement]: compiler.WhileStatement;
    [SyntaxKind.WithStatement]: compiler.WithStatement;
    [SyntaxKind.YieldExpression]: compiler.YieldExpression;
    [SyntaxKind.SemicolonToken]: compiler.Node<ts.Token<SyntaxKind.SemicolonToken>>;
    [SyntaxKind.InferKeyword]: compiler.Node<ts.Token<SyntaxKind.InferKeyword>>;
    [SyntaxKind.NeverKeyword]: compiler.Node<ts.Token<SyntaxKind.NeverKeyword>>;
    [SyntaxKind.AnyKeyword]: compiler.Expression;
    [SyntaxKind.BooleanKeyword]: compiler.Expression;
    [SyntaxKind.NumberKeyword]: compiler.Expression;
    [SyntaxKind.ObjectKeyword]: compiler.Expression;
    [SyntaxKind.StringKeyword]: compiler.Expression;
    [SyntaxKind.SymbolKeyword]: compiler.Expression;
    [SyntaxKind.UndefinedKeyword]: compiler.Expression;
    [SyntaxKind.FalseKeyword]: compiler.FalseLiteral;
    [SyntaxKind.ImportKeyword]: compiler.ImportExpression;
    [SyntaxKind.NullKeyword]: compiler.NullLiteral;
    [SyntaxKind.SuperKeyword]: compiler.SuperExpression;
    [SyntaxKind.ThisKeyword]: compiler.ThisExpression;
    [SyntaxKind.TrueKeyword]: compiler.TrueLiteral;
    [SyntaxKind.VoidExpression]: compiler.VoidExpression;
}

export interface KindToNodeMappings extends ImplementedKindToNodeMappings {
    [kind: number]: compiler.Node;
}

export interface KindToExpressionMappings {
    [kind: number]: compiler.Node;
    [SyntaxKind.ArrayLiteralExpression]: compiler.ArrayLiteralExpression;
    [SyntaxKind.ArrowFunction]: compiler.ArrowFunction;
    [SyntaxKind.AsExpression]: compiler.AsExpression;
    [SyntaxKind.AwaitExpression]: compiler.AwaitExpression;
    [SyntaxKind.BigIntLiteral]: compiler.BigIntLiteral;
    [SyntaxKind.BinaryExpression]: compiler.BinaryExpression;
    [SyntaxKind.CallExpression]: compiler.CallExpression;
    [SyntaxKind.ClassExpression]: compiler.ClassExpression;
    [SyntaxKind.CommaListExpression]: compiler.CommaListExpression;
    [SyntaxKind.ConditionalExpression]: compiler.ConditionalExpression;
    [SyntaxKind.DeleteExpression]: compiler.DeleteExpression;
    [SyntaxKind.ElementAccessExpression]: compiler.ElementAccessExpression;
    [SyntaxKind.FunctionExpression]: compiler.FunctionExpression;
    [SyntaxKind.Identifier]: compiler.Identifier;
    [SyntaxKind.JsxClosingFragment]: compiler.JsxClosingFragment;
    [SyntaxKind.JsxElement]: compiler.JsxElement;
    [SyntaxKind.JsxExpression]: compiler.JsxExpression;
    [SyntaxKind.JsxFragment]: compiler.JsxFragment;
    [SyntaxKind.JsxOpeningElement]: compiler.JsxOpeningElement;
    [SyntaxKind.JsxOpeningFragment]: compiler.JsxOpeningFragment;
    [SyntaxKind.JsxSelfClosingElement]: compiler.JsxSelfClosingElement;
    [SyntaxKind.MetaProperty]: compiler.MetaProperty;
    [SyntaxKind.NewExpression]: compiler.NewExpression;
    [SyntaxKind.NonNullExpression]: compiler.NonNullExpression;
    [SyntaxKind.NoSubstitutionTemplateLiteral]: compiler.NoSubstitutionTemplateLiteral;
    [SyntaxKind.NumericLiteral]: compiler.NumericLiteral;
    [SyntaxKind.ObjectLiteralExpression]: compiler.ObjectLiteralExpression;
    [SyntaxKind.OmittedExpression]: compiler.OmittedExpression;
    [SyntaxKind.ParenthesizedExpression]: compiler.ParenthesizedExpression;
    [SyntaxKind.PartiallyEmittedExpression]: compiler.PartiallyEmittedExpression;
    [SyntaxKind.PostfixUnaryExpression]: compiler.PostfixUnaryExpression;
    [SyntaxKind.PrefixUnaryExpression]: compiler.PrefixUnaryExpression;
    [SyntaxKind.PropertyAccessExpression]: compiler.PropertyAccessExpression;
    [SyntaxKind.RegularExpressionLiteral]: compiler.RegularExpressionLiteral;
    [SyntaxKind.SpreadElement]: compiler.SpreadElement;
    [SyntaxKind.StringLiteral]: compiler.StringLiteral;
    [SyntaxKind.TaggedTemplateExpression]: compiler.TaggedTemplateExpression;
    [SyntaxKind.TemplateExpression]: compiler.TemplateExpression;
    [SyntaxKind.TypeAssertionExpression]: compiler.TypeAssertion;
    [SyntaxKind.TypeOfExpression]: compiler.TypeOfExpression;
    [SyntaxKind.YieldExpression]: compiler.YieldExpression;
    [SyntaxKind.AnyKeyword]: compiler.Expression;
    [SyntaxKind.BooleanKeyword]: compiler.Expression;
    [SyntaxKind.NumberKeyword]: compiler.Expression;
    [SyntaxKind.ObjectKeyword]: compiler.Expression;
    [SyntaxKind.StringKeyword]: compiler.Expression;
    [SyntaxKind.SymbolKeyword]: compiler.Expression;
    [SyntaxKind.UndefinedKeyword]: compiler.Expression;
    [SyntaxKind.FalseKeyword]: compiler.FalseLiteral;
    [SyntaxKind.ImportKeyword]: compiler.ImportExpression;
    [SyntaxKind.NullKeyword]: compiler.NullLiteral;
    [SyntaxKind.SuperKeyword]: compiler.SuperExpression;
    [SyntaxKind.ThisKeyword]: compiler.ThisExpression;
    [SyntaxKind.TrueKeyword]: compiler.TrueLiteral;
    [SyntaxKind.VoidExpression]: compiler.VoidExpression;
}
