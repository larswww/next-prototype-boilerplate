import * as fs from "fs";
import path from 'path'

export const baseDefinition: any = {
    "openapi": "3.0.0",
    "info": {
        "version": "1.0.0",
        "title": "Interface-First Boilerplate",
        "license": {
            "name": "MIT"
        }
    },
    "servers": [
        {
            "url": "http://localhost:3000/api"
        }
    ],
    "paths": {
        "/canary": {
            "get": {
                "summary": "get canary object",
                "operationId": "canary",
                "responses": {
                    "200": {
                        "description": "ok",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/canary"
                                }
                            }
                        }
                    }
                }
            }
        },


        "/pets": {
            "get": {
                "summary": "List all pets",
                "operationId": "listPets",
                "tags": [
                    "pets"
                ],
                "parameters": [
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "How many items to return at one time (max 100)",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "A paged array of pets",
                        "headers": {
                            "x-next": {
                                "description": "A link to the next page of responses",
                                "schema": {
                                    "type": "string"
                                }
                            }
                        },
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Pets"
                                }
                            }
                        }
                    },
                    "default": {
                        "description": "unexpected error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "summary": "Create a pet",
                "operationId": "createPets",
                "tags": [
                    "pets"
                ],
                "responses": {
                    "201": {
                        "description": "Null response"
                    },
                    "default": {
                        "description": "unexpected error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/pets/{petId}": {
            "get": {
                "summary": "Info for a specific pet",
                "operationId": "showPetById",
                "tags": [
                    "pets"
                ],
                "parameters": [
                    {
                        "name": "petId",
                        "in": "path",
                        "required": true,
                        "description": "The id of the pet to retrieve",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Expected response to a valid request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Pet"
                                }
                            }
                        }
                    },
                    "default": {
                        "description": "unexpected error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


export const components = {

}
/**
 * Schemas to be added under components.schemas in the definition file.
 * Any schemas added here will NOT be overwritten by addComponentSchemas.
 */
export const schemas = {
        "Pet": {
            "type": "object",
            "required": [
                "id",
                "name"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "name": {
                    "type": "string"
                },
                "tag": {
                    "type": "string"
                }
            }
        },
        "Pets": {
            "type": "array",
            "items": {
                "$ref": "#/components/schemas/Pet"
            }
        },
        "Error": {
            "type": "object",
            "required": [
                "code",
                "message"
            ],
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "message": {
                    "type": "string"
                }
            }
        }
}

export const addComponentSchemas = (generatedSchemas: {}) => {
    const definition = {...baseDefinition}
    definition.components = {...components}
    definition.components.schemas = {
        ...generatedSchemas,
        ...schemas
    }
    return definition
}

export const getAllSchemasFromFile = () => {
    const normalizedPath = path.join(__dirname, 'gen/schemas')
    const schemas: {[key: string]: any} = {}
    fs.readdirSync(normalizedPath).forEach(file => {
        if (!file.endsWith('.json')) throw new Error('expected json file')
        const name = file.split('.json')[0]
        schemas[name] = require(`./gen/schemas/canary.json`)
        delete schemas[name].$schema // property not expected in definition file
    })
    return schemas
}

export const getJsonOpenAPIDefinition = () => {
    const generatedSchemas = getAllSchemasFromFile()
    const definition = addComponentSchemas(generatedSchemas)
    return definition
}