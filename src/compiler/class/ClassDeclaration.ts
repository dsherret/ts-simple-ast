import {ts, SyntaxKind} from "./../../typescript";
import * as errors from "./../../errors";
import {insertIntoCreatableSyntaxList, insertIntoParentTextRange, getEndIndexFromArray, insertIntoBracesOrSourceFileWithFillAndGetChildren,
    verifyAndGetIndex} from "./../../manipulation";
import {getNamedNodeByNameOrFindFunction, getNotFoundErrorMessageForNameOrFindFunction, TypeGuards, StringUtils, ArrayUtils} from "./../../utils";
import {PropertyDeclarationStructure, MethodDeclarationStructure, ConstructorDeclarationStructure, GetAccessorDeclarationStructure,
    SetAccessorDeclarationStructure, ClassDeclarationStructure} from "./../../structures";
import * as structureToTexts from "./../../structureToTexts";
import {Node} from "./../common";
import {NamedNode, ExportableNode, ModifierableNode, AmbientableNode, JSDocableNode, TypeParameteredNode, DecoratableNode, HeritageClauseableNode,
    ImplementsClauseableNode, TextInsertableNode, ChildOrderableNode} from "./../base";
import {HeritageClause} from "./../general";
import {AbstractableNode} from "./base";
import {SourceFile} from "./../file";
import {ParameterDeclaration} from "./../function";
import {ExpressionWithTypeArguments, Type} from "./../type";
import {NamespaceChildableNode} from "./../namespace";
import {Statement} from "./../statement";
import {callBaseFill} from "./../callBaseFill";
import {ConstructorDeclaration} from "./ConstructorDeclaration";
import {MethodDeclaration} from "./MethodDeclaration";
import {PropertyDeclaration} from "./PropertyDeclaration";
import {GetAccessorDeclaration} from "./GetAccessorDeclaration";
import {SetAccessorDeclaration} from "./SetAccessorDeclaration";

export type ClassInstancePropertyTypes = PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ParameterDeclaration;
export type ClassInstanceMemberTypes = MethodDeclaration | ClassInstancePropertyTypes;
export type ClassStaticPropertyTypes = PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;
export type ClassStaticMemberTypes = MethodDeclaration | ClassStaticPropertyTypes;
export type ClassMemberTypes = MethodDeclaration | PropertyDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration | ParameterDeclaration;

export const ClassDeclarationBase = ChildOrderableNode(TextInsertableNode(ImplementsClauseableNode(HeritageClauseableNode(DecoratableNode(TypeParameteredNode(
    NamespaceChildableNode(JSDocableNode(AmbientableNode(AbstractableNode(ExportableNode(ModifierableNode(NamedNode(Statement)))))))
))))));
export class ClassDeclaration extends ClassDeclarationBase<ts.ClassDeclaration> {
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    fill(structure: Partial<ClassDeclarationStructure>) {
        callBaseFill(ClassDeclarationBase.prototype, this, structure);

        if (structure.extends != null)
            this.setExtends(structure.extends);
        if (structure.ctor != null)
            this.addConstructor(structure.ctor);
        if (structure.properties != null)
            this.addProperties(structure.properties);
        if (structure.getAccessors != null)
            this.addGetAccessors(structure.getAccessors);
        if (structure.setAccessors != null)
            this.addSetAccessors(structure.setAccessors);
        if (structure.methods != null)
            this.addMethods(structure.methods);

        return this;
    }

    /**
     * Sets the extends expression.
     * @param text - Text to set as the extends expression.
     */
    setExtends(text: string) {
        if (StringUtils.isNullOrWhitespace(text))
            return this.removeExtends();

        const heritageClauses = this.getHeritageClauses();
        const extendsClause = this.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
        if (extendsClause != null) {
            const childSyntaxList = extendsClause.getFirstChildByKindOrThrow(SyntaxKind.SyntaxList);
            const childSyntaxListStart = childSyntaxList.getStart();
            insertIntoParentTextRange({
                parent: extendsClause,
                newText: text,
                insertPos: childSyntaxListStart,
                replacing: {
                    textLength: childSyntaxList.getEnd() - childSyntaxListStart
                }
            });
            return this;
        }

        const implementsClause = this.getHeritageClauseByKind(SyntaxKind.ImplementsKeyword);
        let insertPos: number;
        if (implementsClause != null)
            insertPos = implementsClause.getStart();
        else
            insertPos = this.getFirstChildByKindOrThrow(SyntaxKind.OpenBraceToken).getStart();

        const isLastSpace = /\s/.test(this.getSourceFile().getFullText()[insertPos - 1]);
        let newText = `extends ${text} `;
        if (!isLastSpace)
            newText = " " + newText;

        insertIntoCreatableSyntaxList({
            parent: this,
            insertPos,
            newText,
            syntaxList: implementsClause == null ? undefined : implementsClause.getParentSyntaxListOrThrow(),
            childIndex: 0,
            insertItemsCount: 1
        });

        return this;
    }

    /**
     * Removes the extends expression, if it exists.
     */
    removeExtends() {
        const extendsClause = this.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
        if (extendsClause == null)
            return this;
        extendsClause.removeExpression(0);
        return this;
    }

    /**
     * Gets the extends expression or throws if it doesn't exist.
     */
    getExtendsOrThrow() {
        return errors.throwIfNullOrUndefined(this.getExtends(), `Expected to find the extends expression for the class ${this.getName()}.`);
    }

    /**
     * Gets the extends expression or return sundefined if it doesn't exist.
     */
    getExtends(): ExpressionWithTypeArguments | undefined {
        const extendsClause = this.getHeritageClauseByKind(SyntaxKind.ExtendsKeyword);
        if (extendsClause == null)
            return undefined;

        const types = extendsClause.getTypeNodes();
        return types.length === 0 ? undefined : types[0];
    }

    /**
     * Adds a constructor. Will remove the previous constructor if it exists.
     * @param structure - Structure of the constructor.
     */
    addConstructor(structure: ConstructorDeclarationStructure = {}) {
        return this.insertConstructor(getEndIndexFromArray(this.getBodyMembers()), structure);
    }

    /**
     * Inserts a constructor. Will remove the previous constructor if it exists.
     * @param index - Index to insert at.
     * @param structure - Structure of the constructor.
     */
    insertConstructor(index: number, structure: ConstructorDeclarationStructure = {}) {
        for (const c of this.getConstructors())
            c.remove();

        const writer = this.getWriterWithChildIndentation();
        const structureToText = new structureToTexts.ConstructorDeclarationStructureToText(writer);
        structureToText.writeText(structure);
        const code = writer.toString();

        return insertIntoBracesOrSourceFileWithFillAndGetChildren<ConstructorDeclaration, ConstructorDeclarationStructure>({
            getIndexedChildren: () => this.getBodyMembers(),
            sourceFile: this.getSourceFile(),
            parent: this,
            index,
            childCodes: [code],
            structures: [structure],
            previousBlanklineWhen: () => true,
            nextBlanklineWhen: () => true,
            expectedKind: SyntaxKind.Constructor,
            fillFunction: (node, struct) => node.fill(struct)
        })[0];
    }

    /**
     * Gets the constructor declarations.
     */
    getConstructors() {
        return this.getMembers().filter(m => TypeGuards.isConstructorDeclaration(m)) as ConstructorDeclaration[];
    }

    /**
     * Add get accessor.
     * @param structure - Structure representing the get accessor.
     */
    addGetAccessor(structure: GetAccessorDeclarationStructure) {
        return this.addGetAccessors([structure])[0];
    }

    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addGetAccessors(structures: GetAccessorDeclarationStructure[]) {
        return this.insertGetAccessors(getEndIndexFromArray(this.getBodyMembers()), structures);
    }

    /**
     * Insert get accessor.
     * @param index - Index to insert at.
     * @param structure - Structure representing the get accessor.
     */
    insertGetAccessor(index: number, structure: GetAccessorDeclarationStructure) {
        return this.insertGetAccessors(index, [structure])[0];
    }

    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertGetAccessors(index: number, structures: GetAccessorDeclarationStructure[]) {
        const indentationText = this.getChildIndentationText();

        // create code
        const codes = structures.map(s => {
            // todo: pass in the StructureToText to the function below
            const writer = this.getWriterWithChildIndentation();
            const structureToText = new structureToTexts.GetAccessorDeclarationStructureToText(writer);
            structureToText.writeText(s);
            return writer.toString();
        });

        return insertIntoBracesOrSourceFileWithFillAndGetChildren<GetAccessorDeclaration, GetAccessorDeclarationStructure>({
            getIndexedChildren: () => this.getBodyMembers(),
            sourceFile: this.getSourceFile(),
            parent: this,
            index,
            childCodes: codes,
            structures,
            previousBlanklineWhen: () => true,
            separatorNewlineWhen: () => true,
            nextBlanklineWhen: () => true,
            expectedKind: SyntaxKind.GetAccessor,
            fillFunction: (node, structure) => node.fill(structure)
        });
    }

    /**
     * Add set accessor.
     * @param structure - Structure representing the set accessor.
     */
    addSetAccessor(structure: SetAccessorDeclarationStructure) {
        return this.addSetAccessors([structure])[0];
    }

    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addSetAccessors(structures: SetAccessorDeclarationStructure[]) {
        return this.insertSetAccessors(getEndIndexFromArray(this.getBodyMembers()), structures);
    }

    /**
     * Insert set accessor.
     * @param index - Index to insert at.
     * @param structure - Structure representing the set accessor.
     */
    insertSetAccessor(index: number, structure: SetAccessorDeclarationStructure) {
        return this.insertSetAccessors(index, [structure])[0];
    }

    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertSetAccessors(index: number, structures: SetAccessorDeclarationStructure[]) {
        const indentationText = this.getChildIndentationText();
        const newLineKind = this.global.manipulationSettings.getNewLineKindAsString();

        // create code
        const codes = structures.map(s => {
            // todo: pass in the StructureToText to the function below
            const writer = this.getWriterWithChildIndentation();
            const structureToText = new structureToTexts.SetAccessorDeclarationStructureToText(writer);
            structureToText.writeText(s);
            return writer.toString();
        });

        return insertIntoBracesOrSourceFileWithFillAndGetChildren<SetAccessorDeclaration, SetAccessorDeclarationStructure>({
            getIndexedChildren: () => this.getBodyMembers(),
            sourceFile: this.getSourceFile(),
            parent: this,
            index,
            childCodes: codes,
            structures,
            previousBlanklineWhen: () => true,
            separatorNewlineWhen: () => true,
            nextBlanklineWhen: () => true,
            expectedKind: SyntaxKind.SetAccessor,
            fillFunction: (node, structure) => node.fill(structure)
        });
    }

    /**
     * Add property.
     * @param structure - Structure representing the property.
     */
    addProperty(structure: PropertyDeclarationStructure) {
        return this.addProperties([structure])[0];
    }

    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    addProperties(structures: PropertyDeclarationStructure[]) {
        return this.insertProperties(getEndIndexFromArray(this.getBodyMembers()), structures);
    }

    /**
     * Insert property.
     * @param index - Index to insert at.
     * @param structure - Structure representing the property.
     */
    insertProperty(index: number, structure: PropertyDeclarationStructure) {
        return this.insertProperties(index, [structure])[0];
    }

    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    insertProperties(index: number, structures: PropertyDeclarationStructure[]) {
        const indentationText = this.getChildIndentationText();

        // create code
        const codes = structures.map(s => {
            // todo: pass in the StructureToText to the function below
            const writer = this.getWriterWithChildIndentation();
            const structureToText = new structureToTexts.PropertyDeclarationStructureToText(writer);
            structureToText.writeText(s);
            return writer.toString();
        });

        return insertIntoBracesOrSourceFileWithFillAndGetChildren<PropertyDeclaration, PropertyDeclarationStructure>({
            getIndexedChildren: () => this.getBodyMembers(),
            sourceFile: this.getSourceFile(),
            parent: this,
            index,
            childCodes: codes,
            structures,
            previousBlanklineWhen: n => TypeGuards.isBodyableNode(n) || TypeGuards.isBodiedNode(n),
            nextBlanklineWhen: n => TypeGuards.isBodyableNode(n) || TypeGuards.isBodiedNode(n),
            expectedKind: SyntaxKind.PropertyDeclaration,
            fillFunction: (node, structure) => node.fill(structure)
        });
    }

    /**
     * Gets the first instance property by name.
     * @param name - Name.
     */
    getInstanceProperty(name: string): ClassInstancePropertyTypes | undefined;
    /**
     * Gets the first instance property by a find function.
     * @param findFunction - Function to find an instance property by.
     */
    getInstanceProperty(findFunction: (prop: ClassInstancePropertyTypes) => boolean): ClassInstancePropertyTypes | undefined;
    /** @internal */
    getInstanceProperty(nameOrFindFunction: string | ((prop: ClassInstancePropertyTypes) => boolean)): ClassInstancePropertyTypes | undefined;
    getInstanceProperty(nameOrFindFunction: string | ((prop: ClassInstancePropertyTypes) => boolean)): ClassInstancePropertyTypes | undefined {
        return getNamedNodeByNameOrFindFunction(this.getInstanceProperties(), nameOrFindFunction);
    }

    /**
     * Gets the first instance property by name or throws if not found.
     * @param name - Name.
     */
    getInstancePropertyOrThrow(name: string): ClassInstancePropertyTypes;
    /**
     * Gets the first instance property by a find function or throws if not found.
     * @param findFunction - Function to find an instance property by.
     */
    getInstancePropertyOrThrow(findFunction: (prop: ClassInstancePropertyTypes) => boolean): ClassInstancePropertyTypes;
    getInstancePropertyOrThrow(nameOrFindFunction: string | ((prop: ClassInstancePropertyTypes) => boolean)): ClassInstancePropertyTypes {
        return errors.throwIfNullOrUndefined(this.getInstanceProperty(nameOrFindFunction),
            () => getNotFoundErrorMessageForNameOrFindFunction("class instance property", nameOrFindFunction));
    }

    /**
     * Gets the class instance property declarations.
     */
    getInstanceProperties(): ClassInstancePropertyTypes[] {
        return this.getInstanceMembers()
            .filter(m => isClassPropertyType(m)) as ClassInstancePropertyTypes[];
    }

    /**
     * Gets the first static property by name.
     * @param name - Name.
     */
    getStaticProperty(name: string): ClassStaticPropertyTypes | undefined;
    /**
     * Gets the first static property by a find function.
     * @param findFunction - Function to find a static property by.
     */
    getStaticProperty(findFunction: (prop: ClassStaticPropertyTypes) => boolean): ClassStaticPropertyTypes | undefined;
    /** @internal */
    getStaticProperty(nameOrFindFunction: string | ((prop: ClassStaticPropertyTypes) => boolean)): ClassStaticPropertyTypes | undefined;
    getStaticProperty(nameOrFindFunction: string | ((prop: ClassStaticPropertyTypes) => boolean)): ClassStaticPropertyTypes | undefined {
        return getNamedNodeByNameOrFindFunction(this.getStaticProperties(), nameOrFindFunction);
    }

    /**
     * Gets the first static property by name or throws if not found.
     * @param name - Name.
     */
    getStaticPropertyOrThrow(name: string): ClassStaticPropertyTypes;
    /**
     * Gets the first static property by a find function. or throws if not found.
     * @param findFunction - Function to find a static property by.
     */
    getStaticPropertyOrThrow(findFunction: (prop: ClassStaticPropertyTypes) => boolean): ClassStaticPropertyTypes;
    getStaticPropertyOrThrow(nameOrFindFunction: string | ((prop: ClassStaticPropertyTypes) => boolean)): ClassStaticPropertyTypes {
        return errors.throwIfNullOrUndefined(this.getStaticProperty(nameOrFindFunction),
            () => getNotFoundErrorMessageForNameOrFindFunction("class static property", nameOrFindFunction));
    }

    /**
     * Gets the class instance property declarations.
     */
    getStaticProperties(): ClassStaticPropertyTypes[] {
        return this.getStaticMembers()
            .filter(m => isClassPropertyType(m)) as ClassStaticPropertyTypes[];
    }

    /**
     * Add method.
     * @param structure - Structure representing the method.
     */
    addMethod(structure: MethodDeclarationStructure) {
        return this.addMethods([structure])[0];
    }

    /**
     * Add methods.
     * @param structures - Structures representing the methods.
     */
    addMethods(structures: MethodDeclarationStructure[]) {
        return this.insertMethods(getEndIndexFromArray(this.getBodyMembers()), structures);
    }

    /**
     * Insert method.
     * @param index - Index to insert at.
     * @param structure - Structure representing the method.
     */
    insertMethod(index: number, structure: MethodDeclarationStructure) {
        return this.insertMethods(index, [structure])[0];
    }

    /**
     * Insert methods.
     * @param index - Index to insert at.
     * @param structures - Structures representing the methods.
     */
    insertMethods(index: number, structures: MethodDeclarationStructure[]) {
        const indentationText = this.getChildIndentationText();
        const newLineKind = this.global.manipulationSettings.getNewLineKindAsString();
        const isAmbient = this.isAmbient();
        structures = structures.map(s => ({...s}));

        // create code
        const codes = structures.map(s => {
            // todo: pass in the StructureToText to the function below
            const writer = this.getWriterWithChildIndentation();
            const structureToText = new structureToTexts.MethodDeclarationStructureToText(writer, { isAmbient });
            structureToText.writeText(s);
            return writer.toString();
        });

        // insert, fill, and get created nodes
        return insertIntoBracesOrSourceFileWithFillAndGetChildren<MethodDeclaration, MethodDeclarationStructure>({
            getIndexedChildren: () => this.getBodyMembers(),
            sourceFile: this.getSourceFile(),
            parent: this,
            index,
            childCodes: codes,
            structures,
            previousBlanklineWhen: () => !isAmbient,
            nextBlanklineWhen: () => !isAmbient,
            separatorNewlineWhen: () => !isAmbient,
            expectedKind: SyntaxKind.MethodDeclaration,
            fillFunction: (node, structure) => {
                // todo: remove filling when writing
                const params = structure.parameters;
                delete structure.docs;
                delete structure.parameters;
                node.fill(structure);
                if (params)
                    node.getParameters().forEach((p, i) => p.fill(params[i]));
            }
        });
    }

    /**
     * Gets the first instance method by name.
     * @param name - Name.
     */
    getInstanceMethod(name: string): MethodDeclaration | undefined;
    /**
     * Gets the first instance method by a find function.
     * @param findFunction - Function to find an instance method by.
     */
    getInstanceMethod(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration | undefined;
    /** @internal */
    getInstanceMethod(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration | undefined;
    getInstanceMethod(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration | undefined {
        return getNamedNodeByNameOrFindFunction(this.getInstanceMethods(), nameOrFindFunction);
    }

    /**
     * Gets the first instance method by name or throws if not found.
     * @param name - Name.
     */
    getInstanceMethodOrThrow(name: string): MethodDeclaration;
    /**
     * Gets the first instance method by a find function. or throws if not found.
     * @param findFunction - Function to find an instance method by.
     */
    getInstanceMethodOrThrow(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration;
    getInstanceMethodOrThrow(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration {
        return errors.throwIfNullOrUndefined(this.getInstanceMethod(nameOrFindFunction),
            () => getNotFoundErrorMessageForNameOrFindFunction("class instance method", nameOrFindFunction));
    }

    /**
     * Gets the class instance method declarations.
     */
    getInstanceMethods(): MethodDeclaration[] {
        return this.getInstanceMembers().filter(m => m instanceof MethodDeclaration) as MethodDeclaration[];
    }

    /**
     * Gets the first static method by name.
     * @param name - Name.
     */
    getStaticMethod(name: string): MethodDeclaration | undefined;
    /**
     * Gets the first static method by a find function.
     * @param findFunction - Function to find a static method by.
     */
    getStaticMethod(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration | undefined;
    /** @internal */
    getStaticMethod(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration | undefined;
    getStaticMethod(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration | undefined {
        return getNamedNodeByNameOrFindFunction(this.getStaticMethods(), nameOrFindFunction);
    }

    /**
     * Gets the first static method by name or throws if not found.
     * @param name - Name.
     */
    getStaticMethodOrThrow(name: string): MethodDeclaration;
    /**
     * Gets the first static method by a find function. or throws if not found.
     * @param findFunction - Function to find a static method by.
     */
    getStaticMethodOrThrow(findFunction: (method: MethodDeclaration) => boolean): MethodDeclaration;
    getStaticMethodOrThrow(nameOrFindFunction: string | ((method: MethodDeclaration) => boolean)): MethodDeclaration {
        return errors.throwIfNullOrUndefined(this.getStaticMethod(nameOrFindFunction), () => getNotFoundErrorMessageForNameOrFindFunction("class static method", nameOrFindFunction));
    }

    /**
     * Gets the class instance method declarations.
     */
    getStaticMethods(): MethodDeclaration[] {
        return this.getStaticMembers().filter(m => m instanceof MethodDeclaration) as MethodDeclaration[];
    }

    /**
     * Gets the first instance member by name.
     * @param name - Name.
     */
    getInstanceMember(name: string): ClassInstanceMemberTypes | undefined;
    /**
     * Gets the first instance member by a find function.
     * @param findFunction - Function to find the instance member by.
     */
    getInstanceMember(findFunction: (member: ClassInstanceMemberTypes) => boolean): ClassInstanceMemberTypes | undefined;
    /** @internal */
    getInstanceMember(nameOrFindFunction: string | ((member: ClassInstanceMemberTypes) => boolean)): ClassInstanceMemberTypes | undefined;
    getInstanceMember(nameOrFindFunction: string | ((member: ClassInstanceMemberTypes) => boolean)): ClassInstanceMemberTypes | undefined {
        return getNamedNodeByNameOrFindFunction(this.getInstanceMembers(), nameOrFindFunction);
    }

    /**
     * Gets the first instance member by name or throws if not found.
     * @param name - Name.
     */
    getInstanceMemberOrThrow(name: string): ClassInstanceMemberTypes;
    /**
     * Gets the first instance member by a find function. or throws if not found.
     * @param findFunction - Function to find the instance member by.
     */
    getInstanceMemberOrThrow(findFunction: (member: ClassInstanceMemberTypes) => boolean): ClassInstanceMemberTypes;
    getInstanceMemberOrThrow(nameOrFindFunction: string | ((member: ClassInstanceMemberTypes) => boolean)): ClassInstanceMemberTypes {
        return errors.throwIfNullOrUndefined(this.getInstanceMember(nameOrFindFunction),
            () => getNotFoundErrorMessageForNameOrFindFunction("class instance member", nameOrFindFunction));
    }

    /**
     * Gets the instance members.
     */
    getInstanceMembers() {
        return this.getMembers().filter(m => !TypeGuards.isConstructorDeclaration(m) && (TypeGuards.isParameterDeclaration(m) || !m.isStatic())) as ClassInstanceMemberTypes[];
    }

    /**
     * Gets the first static member by name.
     * @param name - Name.
     */
    getStaticMember(name: string): ClassStaticMemberTypes | undefined;
    /**
     * Gets the first static member by a find function.
     * @param findFunction - Function to find an static method by.
     */
    getStaticMember(findFunction: (member: ClassStaticMemberTypes) => boolean): ClassStaticMemberTypes | undefined;
    /** @internal */
    getStaticMember(nameOrFindFunction: string | ((member: ClassStaticMemberTypes) => boolean)): ClassStaticMemberTypes | undefined;
    getStaticMember(nameOrFindFunction: string | ((member: ClassStaticMemberTypes) => boolean)): ClassStaticMemberTypes | undefined {
        return getNamedNodeByNameOrFindFunction(this.getStaticMembers(), nameOrFindFunction);
    }

    /**
     * Gets the first static member by name or throws if not found.
     * @param name - Name.
     */
    getStaticMemberOrThrow(name: string): ClassStaticMemberTypes;
    /**
     * Gets the first static member by a find function. or throws if not found.
     * @param findFunction - Function to find an static method by.
     */
    getStaticMemberOrThrow(findFunction: (member: ClassStaticMemberTypes) => boolean): ClassStaticMemberTypes;
    getStaticMemberOrThrow(nameOrFindFunction: string | ((member: ClassStaticMemberTypes) => boolean)): ClassStaticMemberTypes {
        return errors.throwIfNullOrUndefined(this.getStaticMember(nameOrFindFunction), () => getNotFoundErrorMessageForNameOrFindFunction("class static member", nameOrFindFunction));
    }

    /**
     * Gets the static members.
     */
    getStaticMembers() {
        return this.getMembers().filter(m => !TypeGuards.isConstructorDeclaration(m) && !(m instanceof ParameterDeclaration) && m.isStatic()) as ClassStaticMemberTypes[];
    }

    /**
     * Gets the constructors, methods, properties, and class parameter properties (regardless of whether an instance of static member).
     */
    getMembers() {
        const members = this.getBodyMembers();
        const implementationCtors = members.filter(c => TypeGuards.isConstructorDeclaration(c) && c.isImplementation()) as ConstructorDeclaration[];
        for (const ctor of implementationCtors) {
            // insert after the constructor
            let insertIndex = members.indexOf(ctor) + 1;
            for (const param of ctor.getParameters()) {
                if (param.isParameterProperty()) {
                    members.splice(insertIndex, 0, param);
                    insertIndex++;
                }
            }
        }

        return members;
    }

    /**
     * Gets the base types.
     *
     * This is useful to use if the base could possibly be a mixin.
     */
    getBaseTypes(): Type[] {
        return this.getType().getBaseTypes();
    }

    /**
     * Gets the base class or throws.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    getBaseClassOrThrow() {
        return errors.throwIfNullOrUndefined(this.getBaseClass(), `Expected to find the base class of ${this.getName()}.`);
    }

    /**
     * Gets the base class.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    getBaseClass() {
        const baseTypes = ArrayUtils.flatten(this.getBaseTypes().map(t => t.isIntersectionType() ? t.getIntersectionTypes() : [t]));
        const declarations = baseTypes
            .map(t => t.getSymbol())
            .filter(s => s != null)
            .map(s => s!.getDeclarations())
            .reduce((a, b) => a.concat(b), [])
            .filter(d => d.getKind() === SyntaxKind.ClassDeclaration);
        if (declarations.length !== 1)
            return undefined;
        return declarations[0] as ClassDeclaration;
    }

    /**
     * Gets all the derived classes.
     */
    getDerivedClasses() {
        const classes = this.getImmediateDerivedClasses();

        for (let i = 0; i < classes.length; i++) {
            const derivedClasses = classes[i].getImmediateDerivedClasses();
            for (const derivedClass of derivedClasses) {
                // don't allow circular references
                if (derivedClass !== this && classes.indexOf(derivedClass) === -1)
                    classes.push(derivedClass);
            }
        }

        return classes;
    }

    private getImmediateDerivedClasses() {
        const references = this.getNameNode().findReferences();
        const classes: ClassDeclaration[] = [];
        for (const reference of references) {
            for (const ref of reference.getReferences()) {
                if (ref.isDefinition())
                    continue;
                const node = ref.getNode();
                const nodeParent = node.getParentIfKind(SyntaxKind.ExpressionWithTypeArguments);
                if (nodeParent == null)
                    continue;
                const heritageClause = nodeParent.getParentIfKind(SyntaxKind.HeritageClause) as HeritageClause;
                if (heritageClause == null || heritageClause.getToken() !== SyntaxKind.ExtendsKeyword)
                    continue;
                classes.push(heritageClause.getFirstAncestorByKindOrThrow(SyntaxKind.ClassDeclaration) as ClassDeclaration);
            }
        }

        return classes;
    }

    private getBodyMembers() {
        const members = this.compilerNode.members.map(m => this.getNodeFromCompilerNode<ClassMemberTypes>(m));

        // filter out the method declarations or constructor declarations without a body if not ambient
        return this.isAmbient() ? members : members.filter(m => {
            if (!(TypeGuards.isConstructorDeclaration(m) || TypeGuards.isMethodDeclaration(m)))
                return true;
            if (TypeGuards.isMethodDeclaration(m) && m.isAbstract())
                return true;
            return m.isImplementation();
        });
    }
}

function isClassPropertyType(m: Node) {
    return TypeGuards.isPropertyDeclaration(m) || TypeGuards.isSetAccessorDeclaration(m) || TypeGuards.isGetAccessorDeclaration(m) || TypeGuards.isParameterDeclaration(m);
}
