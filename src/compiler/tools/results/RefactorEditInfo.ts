import { ts } from "../../../typescript";
import { Memoize } from "../../../utils";
import { FileTextChanges } from "./FileTextChanges";

/**
 * Represents a refactor edit.
 */
export class RefactorEditInfo {
    /** @internal */
    private readonly _compilerObject: ts.RefactorEditInfo;

    /** @internal */
    constructor(compilerObject: ts.RefactorEditInfo) {
        this._compilerObject = compilerObject;
    }

    /** Gets the compiler refactor edit info. */
    get compilerObject() {
        return this._compilerObject;
    }

    /**
     * Gets refactor file text changes
     */
    @Memoize
    getEdits() {
        return this.compilerObject.edits.map(edit => new FileTextChanges(edit));
    }

    /**
     * Gets the file path for a rename refactor.
     */
    getRenameFilePath() {
        return this.compilerObject.renameFilename;
    }

    getRenameLocation() {
        return this.compilerObject.renameLocation;
    }

    // TODO: getCommands
}