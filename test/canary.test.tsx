import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'

describe('Canary', () => {

    test('Test suite runs', () => {
        expect(true).toBe(true)
    })

    test('Next.js index page testing works', () => {
        const { getByRole } = render(<Index />)

    })
})
