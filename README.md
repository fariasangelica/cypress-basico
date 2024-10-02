# Central de Atendimento ao Cliente TAT 
A aplicação se chama Central de Atendimento ao Cliente TAT - [**CAC TAT**](https://cac-tat.s3.eu-central-1.amazonaws.com/index.html) - e foi desenvolvida usando HTML, CSS e JavaScript.



## Funcionalidades da aplicação    
 
A aplicação CAC TAT é um formulário para simular o envio de mensagens à uma central de atendimento ao cliente.  
 
### Campos obrigatórios
 
Os seguintes campos são obrigatórios, por padrão:

- Nome (campo do tipo texto)
- Sobrenome (campo do tipo texto)
- Email (campo do tipo email, **com validacão**)
- Como podemos te ajudar? (campo de área de texto)

### Outros campos

Além dos campos obrigatórios, o "cliente" pode informar:

- Seu telefone (campo do tipo número)
- O produto ao qual deseja atendimento (campo de seleção suspensa com as opções Blog, Cursos, Mentoria e YouTube)
- O tipo de atendimento (campos do tipo radio com os valores Ajuda, Elogio e Feedback)
- Meio de contato preferêncial (campos de checkbox com os valores Email e Telefone)
- Um anexo (o "cliente" pode adicionar um arquivo como anexo ao atendimento)

### Regras dos meios de contato preferenciais

- Quando o checkbox Telefone é marcado, o input do número do telefone passa a ser obrigatório
- Ao desmarcar o checkbox Telefone, o input do número do telefone deixa de ser obrigatório

### Política de privacidade

Ao clicar no link [Política de privacidade](https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html), na parte inferior da página, tal página é aberta em uma nova aba do navegador.

### Mensagens

⚠️ Caso haja algum problema relacionado aos campos obrigatórios, a seguinte mensagem é exibida (em um fundo amarelo): `Valide os campos obrigatórios!`.

✅ Ao submeter o formulário com sucesso, a seguinte mensagem é exibida (em um fundo verde): `Mensagem enviada com sucesso.`

> Além disso, quando o formulário é enviado com sucesso, todos os campos voltam ao seu estado padrão.
> 


# Pré-requisitos

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

- [git](https://git-scm.com/) (estou usando a versão `2.40.1`)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v18.16.0`)
- npm (estou usando a versão `9.5.1`)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (estou usando a versão `120.0.6099.217 64 bits`)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.64.0`) ou alguma outra IDE de sua preferência

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando `git --version && node --version && npm --version` no seu terminal de linha de comando.
