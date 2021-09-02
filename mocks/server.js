import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { handlers } from './handlers.js'
import OpenAPIBackend from 'openapi-backend';
import canaryHandler from "./handlers/canary";
import definition from './OpenAPIdefinition.json'
import saveAsSchema from "./generateJsonSchema";

const api = new OpenAPIBackend({ definition });

api.register('notFound', (c, res, ctx) => res(ctx.status(404)));
api.register('notImplemented', async (c, res, ctx) => {
    const { status, mock } = await api.mockResponseForOperation(c.operation.operationId);
    return res(ctx.status(status), ctx.json(mock));
});
api.register('validationFail', (c, res, ctx) => res(
    ctx.status(400),
    ctx.json({ error: c.validation.errors }),
));

// register custom handlers here
api.register('canary', canaryHandler)

/**
 * Will generate JSON schemas for all types/interfaces
 */
const fixtureFileNames = ['canary']
for (let fixture of fixtureFileNames) saveAsSchema(fixture)

// tell msw to intercept all requests to api/* with our mock
export const server = setupServer(
    rest.get('/api/*', (req, res, ctx) => api.handleRequest(req, res, ctx))
);
