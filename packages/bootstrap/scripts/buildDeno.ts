import { tsMorph } from "@ts-morph/scripts";
const { Node, Project } = tsMorph;

const project = new Project();
const fileSystem = project.getFileSystem();
const destPath = "../../deno/bootstrap";

fileSystem.mkdirSync(destPath);
fileSystem.copySync("./dist-deno/ts-morph-bootstrap.js", `${destPath}/ts-morph-bootstrap.js`);
fileSystem.copySync("./lib/ts-morph-bootstrap.d.ts", `${destPath}/ts-morph-bootstrap.d.ts`);
fileSystem.writeFileSync(`${destPath}/mod.ts`, `/// <deno-types path="./ts-morph-bootstrap.d.ts" />\nexport * from "./ts-morph-bootstrap.js";\n`);

updateCommonImportsExports(project.addSourceFileAtPath(`${destPath}/ts-morph-bootstrap.js`)).saveSync();
updateCommonImportsExports(project.addSourceFileAtPath(`${destPath}/ts-morph-bootstrap.d.ts`)).saveSync();

function updateCommonImportsExports(file: tsMorph.SourceFile) {
    for (const statement of file.getStatements()) {
        if (!Node.isExportDeclaration(statement) && !Node.isImportDeclaration(statement))
            continue;
        const moduleSpecifierValue = statement.getModuleSpecifierValue();
        if (moduleSpecifierValue === "@ts-morph/common")
            statement.setModuleSpecifier("../common/mod.ts");
    }
    return file;
}