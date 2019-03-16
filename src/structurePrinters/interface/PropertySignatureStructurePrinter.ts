import { CodeBlockWriter } from "../../codeBlockWriter";
import { PropertySignatureStructure, OptionalKind } from "../../structures";
import { FactoryStructurePrinter } from "../FactoryStructurePrinter";
import { NewLineFormattingStructuresPrinter } from "../formatting";

export class PropertySignatureStructurePrinter extends FactoryStructurePrinter<OptionalKind<PropertySignatureStructure>> {
    private readonly multipleWriter = new NewLineFormattingStructuresPrinter(this);

    printTexts(writer: CodeBlockWriter, structures: ReadonlyArray<OptionalKind<PropertySignatureStructure>> | undefined) {
        this.multipleWriter.printText(writer, structures);
    }

    printText(writer: CodeBlockWriter, structure: OptionalKind<PropertySignatureStructure>) {
        this.factory.forJSDoc().printDocs(writer, structure.docs);
        this.factory.forModifierableNode().printText(writer, structure);
        writer.write(structure.name);
        writer.conditionalWrite(structure.hasQuestionToken, "?");
        this.factory.forTypedNode(":").printText(writer, structure);
        // why would someone write an initializer? I guess let them do it...
        this.factory.forInitializerExpressionableNode().printText(writer, structure);
        writer.write(";");
    }
}
