import * as TJS from "typescript-json-schema";
import fs from "fs";
import generateSchemas from "./typescriptJSONSchema";

export const saveJSON = (file: string, pathAndName: string) => {
    fs.writeFileSync(pathAndName, JSON.stringify(file))
}

export const generate = () => {
    generateSchemas()

}

export default generate()