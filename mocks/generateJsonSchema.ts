import { resolve } from "path";
import * as TJS from "typescript-json-schema";
import * as fs from "fs";
const fixtureDirectory = './mocks/fixtures'


export const getSchema = (fileName: string) => {
    const program = TJS.getProgramFromFiles(
        [resolve(`${fixtureDirectory}/${fileName}`)],
    );
    const schema = TJS.generateSchema(program, fileName);
    return schema
}

export const saveSchema = (schema: TJS.Definition | null, pathAndName: string) => {
    fs.writeFileSync(pathAndName, JSON.stringify(schema))
}

export const saveAsSchema = (fileName: string) => {
    const schema = getSchema(fileName)
    saveSchema(schema, `${fixtureDirectory}/schemas/${fileName}.json`)
}

export default saveAsSchema