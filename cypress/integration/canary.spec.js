describe('Canary', () => {

    it('Logs [MSW] Mocking enabled. to console so service worker is installed', () => {
        cy.visit('/', {
            onBeforeLoad(win) {
                cy.stub(win.console, 'groupCollapsed').as('console')
            }
        })
        cy.get('@console').should('be.calledWith', '%c[MSW] Mocking enabled.', 'color:orangered;font-weight:bold;')
    })
})