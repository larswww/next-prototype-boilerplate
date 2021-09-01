describe('Canary', () => {

    it('Logs [MSW] Mocking enabled. to console confirming mock service worker is installed', () => {
        cy.visit('/', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'groupCollapsed').as('console')
            }
        })
        cy.get('@console').should('be.calledWith', '%c[MSW] Mocking enabled.', 'color:orangered;font-weight:bold;')
    })

    it('Renders data from the mock API', () => {
        cy.visit('/')
        cy.contains('Loading...')
        cy.contains('Hello from Mock API with MSW.js')
    })



})