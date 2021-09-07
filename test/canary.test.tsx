import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'
import Canary from '../components/Canary' //todo @components module mapping from tsconfig
import {fixture} from "../mocks/fixtures/canary";
import generateSchemas, {getAllTsFiles} from "../mocks/typescriptJSONSchema";
import * as fs from "fs";
import {getJsonOpenAPIDefinition} from "../mocks/openAPIdefinition";
import validator from 'ibm-openapi-validator'


describe('Canary', () => {

    test('Test suite runs', () => {
        expect(true).toBe(true)
    })

    test('Next.js index page renders a main element', () => {
        const { getByRole } = render(<Index />)
        getByRole('main')
    })

    test('unit tests with jest and testing-library', () => {
        const canary = render(<Canary message={fixture.message} />)
        canary.getByText('Canary')
    })

    test('next/image works in test with external url source', () => {
        const { getByRole } = render(<Canary message={fixture.message} />)
        getByRole('img')
    })

    test('css from modules is rendered', () => {
        const { getByRole } = render(<Canary message={fixture.message} />)
        const p = getByRole('test')
        expect(p).toHaveClass('test')
        expect(p).toHaveStyle('background-color: green')
    })


    test('save generated schema', () => {
        expect(generateSchemas).not.toThrowError()

    })

    test('reading fixtures dir and returning array of .ts files', () => {
        const typescriptFiles = getAllTsFiles()
        expect(typescriptFiles[0]).toContain('.ts')
    })


    test('generated openAPI definition has "canary" under components.schemas.canar', () => {
        const definition = getJsonOpenAPIDefinition()
        const parsed = JSON.parse(definition)
        expect(parsed).toHaveProperty('components.schemas.canary')
    })

    test('openAPI definition is valid', (done) => {
        const definition = getJsonOpenAPIDefinition()
        validator(definition)
            .then(validationResults => {
                const {errors, warnings} = validationResults
                if (errors.length) {
                    console.log('OpenAPI spec Errors:')
                    console.table(errors);
                }

                if (warnings.length) {
                    console.log('OpenAPI spec Warnings:')
                    console.table(warnings)
                }

                expect(errors).toHaveLength(0)
                done()
            });

    })

})
