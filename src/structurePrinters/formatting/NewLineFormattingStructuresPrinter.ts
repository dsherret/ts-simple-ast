import { CodeBlockWriter } from "../../codeBlockWriter";
import { Printer } from "../Printer";

export class NewLineFormattingStructuresPrinter<T> extends Printer<ReadonlyArray<T>> {
    constructor(private readonly printer: Printer<T>) {
        super();
    }

    printText(writer: CodeBlockWriter, structures: ReadonlyArray<T> | undefined) {
        if (structures == null)
            return;

        for (let i = 0; i < structures.length; i++) {
            writer.conditionalNewLine(i > 0);
            this.printer.printText(writer, structures[i]);
        }
    }
}
