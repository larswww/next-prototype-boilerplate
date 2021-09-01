import canaryFixture from '../fixtures/canary'

const canaryHandler = (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(canaryFixture))
}

export default canaryHandler