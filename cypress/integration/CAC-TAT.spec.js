/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function(){
        cy.visit('src/index.html')

    })
    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    })

    it('preenche os campos obrigatórios e envia o formulário',function(){
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.clock()

        cy.get('#firstName').type('Angelica')
        cy.get('#lastName').type('Farias')
        cy.get('#email').type('angelica@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.clock()

    
        cy.get('#firstName').type('Angelica')
        cy.get('#lastName').type('Farias')
        cy.get('#email').type('angelica@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

})

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function() {
        cy.get('#phone')
            .type('abdcdefghij')
            .should('have.value', '') //tentando preencher um valor não-númerico e depois o valor da string vazia, pois ele não conseuiu digitar.

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()

        cy.get('#firstName').type('Angelica')
        cy.get('#lastName').type('Farias')
        cy.get('#email').type('angelica@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
       
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Angelica')
            .should('have.value', 'Angelica')
            .clear()
            .should('have.value', '')
            cy.get('#lastName')
            .type('Farias')
            .should('have.value', 'Farias')
            .clear()
            .should('have.value', '')
            cy.get('#email')
            .type('angelica.farias@gmail.com')
            .should('have.value', 'angelica.farias@gmail.com')
            .clear()
            .should('have.value', '')
            cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.error').should('not.be.visible')
    })

    //teste com comando customizado

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })
       
    // Selecionar um produto por seu texto
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube') //valor é com letra minuscula 

    })

    // Selecionar um produto por seu valor
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
         .select('mentoria')
         .should('have.value', 'mentoria')
    })

    // Selecionar um produto por seu índice
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')


    })

    // Marcando input do tipo Radio

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
         .should('have.length', 3)
         .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked') //verificar a marcação
         })
    })



    // Marcando (e desmacarndo) inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    // Fazendo upload de arquivos
    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

        })

    })

    // seleciona um arquivo simulando um drag-and-drop
    it('seleciona um arquivo simulando um drag-and-drop', function(){
            cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'}) //primeiro arquivo e segundo um objeto
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')

        })
    }) 
    
    //seleciona um arquivo utilizando uma fixture
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
    
            })

    })

    // Lidando com links que abrem em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a página da política de privacidade de forma independente', function() {

    })

    // Invoke

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      //Criação texto longo com o invoke
      it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
      })

      // Comando cy.request
      it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')


            })
      })

      it.only('encontra o gato escondido', function () {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu amo gatos!')


      })

  })




 
  
