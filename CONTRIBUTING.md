# Contribuindo para o Curso em Texto

Muito obrigado por querer contribuir com o nosso projeto. Cada contribuição, por menor que pareça, faz muita diferença e nos ajuda a atingir nosso objetivo de transformar o aprendizado.

Aqui está o nosso guia para te ajudar a começar.

## Sugestões e reporte de bugs

Se você tiver alguma sugestão ou quiser reportar um bug, utilize a seção de [discussão](https://github.com/d3vlopes/curso-em-texto/discussions).

Antes de criar uma nova discussão, pesquise se o assunto já está sendo abordado.

Descrição e comentários devem ser feitos em português.

## Configurando o projeto

Se você está procurando como configurar o projeto, acesse nosso [README](README.md)

## Issues

Issues são tarefas que devem ser realizadas no projeto. Você pode acessar todas as issues do projeto [clicando aqui](https://github.com/d3vlopes/curso-em-texto/issues).

### Labels

Cada issue pode conter uma ou mais labels. Labels são uma forma de agrupar issue em categorias.

Aqui está algumas labels que temos:

- `feature`: Criação de uma nova funcionalidade
- `fix`: Algum problema/erro que precisa ser resolvido </br>
- `chore`: Outra alteração que não seja uma correção ou adição de uma funcionalidade </br>
- `docs`: Altera ou adiciona documentação </br>
- `frontend`: Tarefa relacionado ao frontend do projeto </br>
- `backend`: Tarefa relacionado ao backend do projeto </br>
- `good first issue`: Tarefa reservada para iniciantes
- `low`: Tarefas com baixa prioridade </br>
- `medium`: Tarefas com média prioridade </br>
- `high`: Prioridade com alta prioridade </br>

### Status

Uma issue, pode conter diferentes status. Uma issue com o status `backlog` ainda não foi refinada e não está pronta para ser iniciada. Uma issue com status `ready` já foi refinada e está pronta para ser iniciada.

## Dependências

Uma issue pode depender de outras. Nesses casos, ela só poderá ser finalizada após o merge de suas dependências. No entanto, você pode começar a trabalhar nela para adiantar o desenvolvimento e se familiarizar com o código. Quando as dependências forem implementadas, basta atualizar sua branch e integrar as mudanças.

## Assumindo uma issue

Acesse a issue que você quer trabalhar e adicione um comentário do tipo "vou trabalhar nisso".

Se você não abrir PR em até 14 dias após assumir a issue, ela será liberada para outra pessoa.

## Pull Request

Para finalizar uma issue, será necessário fazer um `pull request`.

Veja abaixo o passo a passo:

1. Crie uma branch, seguindo esse padrão `<type>/<nome-da-branch>`
2. Faça as alterações e sincronize sua branch com upstream, seguindo essas etapas:
3. Faça checkout para main executando `git checkout main`
4. Execute `git pull upstream main --rebase`
5. Faça checkout de volta para sua branch executando `git checkout -`
6. Faça Execute o comando `git rebase main` na sua branch de trabalho
7. Faça push para origin executando `git push origin sua-branch`
8. Vá para o repositório do projeto e abra um pull request

Pronto! Agora é só esperar a revisão da sua contribuição. Quando tiver mudanças para fazer após a revisão, basta fazer as alterações necessárias e fazer um novo push, isso ira automaticamente atualizar o PR, você não precisa abrir um novo.

Quando tudo estiver certo um mantenedor do repositório ira fazer o merge da sua contribuição.

## Code review

Mesmo não sendo um mantenedor do repositório, você também pode revisar os pull requests. Se você não tem muita experiência com essa prática, esse documento pode te ajudar.

[Boas práticas code review](https://goldenrod-pen-c7d.notion.site/Boas-pr-ticas-code-review-5cc604dadb9f4571b2a50ef5ba598045)

## Gerenciamento do projeto

Você pode ter uma visão completa sobre o andamento e gerenciamento do projeto acessando a seção [projects](https://github.com/users/d3vlopes/projects/13)

## Testes

Se você pegar uma issue que exija testes é importante você criar uma boa suite de testes. Se você não tem muita experiência em escrever testes, você pode utilizar a extensão para VSCode [Qodo Gen](https://marketplace.visualstudio.com/items?itemName=Codium.codium) para te ajudar a criar os testes.

## Utilize os examples como referência

Tanto o frontend como o backend contém `examples` para você utilizar como base e entender como tudo se conecta no projeto. Quando for criar um novo recurso utilize eles como referência.

## Discord

Participe do nosso [Discord](https://discord.gg/55e3kf6DPv) para fazer networking e participar das decisões do projeto.
