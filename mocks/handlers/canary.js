import {fixture} from '../fixtures/canary'

const canaryHandler = (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fixture))
}

export default canaryHandler