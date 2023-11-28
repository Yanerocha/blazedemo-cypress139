// Grupo de testes
describe('Busca por voos', () => {
  // Contexto / Cenário
  context('Não Logado', () => {
    // Caminho para o arquivo com a massa de teste
    const massavoos = require('../fixtures/massaVoos')

    // Inicialização dos testes / Antes dos testes
    beforeEach(() => {
      cy.visit('/') // abrir a página inicial da URL informada
    })

    // Exemplo de Teste Simples
    it('Buscar voos entre São Paulo e Cairo - Simples', () => {

      // Verifica se o título da guia é igual 'Blazedemo'
      cy.title().should('eq', 'BlazeDemo')

      // Preenche a origem e o destino do voo
      cy.get('select.form-inline')
      .eq(0)
      .select('São Paolo')

      cy.get('select.form-inline')
      .eq(1)
      .select('Cairo')

      // Aperta o botão Find Flights
      cy.get('input.btn.btn-primary').click()

      // Ocorre a transição para a pagina de Reserva
      cy.title().should('eq', 'BlazeDemo - reserve')

      // Verifica a frase de origem e destino do voo
      cy.get('.container h3')
        .should('have.text', 'Flights from São Paolo to Cairo: ' )

      cy.get('tbody input[type= "submit"]')
        .eq(0)
        .click()

    });

          // Exemplo de Teste Data Driven
          massavoos.array.forEach(({ origem, destino}) => {
    it(`Buscar voos entre ${origem} e ${destino} - Simples`, () => {

      // Verifica se o título da guia é igual 'BlazeDemo'
      cy.title().should('eq', 'BlazeDemo')

      // Preenche a origem e o destino do voo
      cy.get('select.form-inline')
      .eq(0)
      .select(origem)

      cy.get('select.form-inline')
      .eq(1)
      .select(destino)

      // Aperta o botão Find Flights
      cy.get('input.btn.btn-primary').click()

      // Ocorre a transição para a pagina de Reserva
      cy.title().should('eq', 'BlazeDemo - reserve')

      // Verifica a frase de origem e destino do voo
      cy.get('.container h3')
        .should('have.text', `Flights from ${origem} to ${destino}: ` )

      cy.get('tbody input[type= "submit"]')
        .eq(0)
        .click()
 
    }); // fim do it
  }) // fim do array

  }) // fim do context
}) //fim do describe