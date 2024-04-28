import Login from '@/views/auth/Login.vue'

describe('Vue Component', () => {
  it('挂载渲染 - Login 组件', () => {
    cy.mount(Login)
  })

  it('模拟触发 - Input 校验', () => {
    cy.mount(Login)

    cy.get('input[type="text"]').as('usernameInput')
    cy.get('input[type="password"]').as('passwordInput')

    cy.get('@usernameInput').type('admin')
    cy.get('@passwordInput').type('password')

    cy.get('@usernameInput').should('have.value', 'admin')
    cy.get('@passwordInput').should('have.value', 'password')
  })
})
