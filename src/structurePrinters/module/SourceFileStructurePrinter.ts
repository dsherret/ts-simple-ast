﻿import { CodeBlockWriter } from "../../codeBlockWriter";
import { StructurePrinterFactory } from "../../factories";
import { SourceFileStructure } from "../../structures";
import { ArrayUtils } from "../../utils";
import { NodePrinter } from "../NodePrinter";

export class SourceFileStructurePrinter extends NodePrinter<SourceFileStructure> {
    constructor(factory: StructurePrinterFactory, private readonly options: { isAmbient: boolean; }) {
        super(factory);
    }

    protected printTextInternal(writer: CodeBlockWriter, structure: SourceFileStructure) {
        this.factory.forImportDeclaration().printTexts(writer, structure.imports);

        this.factory.forStatementedNode(this.options).printText(writer, structure);

        this.conditionalBlankLine(writer, structure.exports);
        this.factory.forExportDeclaration().printTexts(writer, structure.exports);

        writer.conditionalNewLine(!writer.isAtStartOfFirstLineOfBlock() && !writer.isLastNewLine());
    }

    private conditionalBlankLine(writer: CodeBlockWriter, structures: ReadonlyArray<any> | undefined) {
        if (!ArrayUtils.isNullOrEmpty(structures))
            writer.conditionalBlankLine(!writer.isAtStartOfFirstLineOfBlock());
    }
}
