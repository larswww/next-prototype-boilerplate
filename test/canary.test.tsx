import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'
import Canary from '../components/Canary' //todo @components module mapping from tsconfig
import {fixture} from "../mocks/fixtures/canary";
import generateSchemas from "../mocks/generateJsonSchema";


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



})
