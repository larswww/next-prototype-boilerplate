import {rest} from 'msw' // https://mswjs.io/docs/getting-started/mocks/rest-api
import canaryHandler from './handlers/canary'

export const handlers = [
    rest.get(`${process.env.NEXT_PUBLIC_API_URL}/canary`, canaryHandler)
]