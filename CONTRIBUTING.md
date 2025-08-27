# Contribuindo para o Curso em Texto

Seja muito bem-vindo(a)!
É incrível ver você querendo contribuir com o Curso em Texto. Gratidão! 😊

Se quiser contribuir, seja com código, documentação ou novas ideias, você está no lugar certo. Aqui está o nosso guia para te ajudar a começar.

## Sugestões e reporte de bugs

Se você tiver alguma sugestão ou quiser reportar um bug, utilize a seção de [discussão](https://github.com/d3vlopes/curso-em-texto/discussions).

Antes de criar uma nova discussão, pesquise se o assunto já está sendo abordado.</br>
Descrição e comentários devem ser feitos em português.

## Issues

Você pode acessar todas as issues do projeto acessando a seção [issues](https://github.com/d3vlopes/curso-em-texto/issues).

### Labels

Cada issue pode conter uma ou mais labels. Labels são uma forma de agrupar issue em categorias. </br>
Aqui está algumas labels que temos:

`feature`: Criação de uma nova funcionalidade </br>
`fix`: Algum problema/erro que precisa ser resolvido </br>
`chore`: Outra alteração que não seja uma correção ou adição de uma funcionalidade </br>
`docs`: Altera ou adiciona documentação </br>
`frontend`: Tarefa relacionado ao frontend do projeto </br>
`backend`: Tarefa relacionado ao backend do projeto </br>
`low`: Tarefas com baixa prioridade </br>
`medium`: Tarefas com média prioridade </br>
`high`: Prioridade com alta prioridade </br>
`good first issue`: Tarefa reservada para iniciantes

### Status

Uma issue, pode conter diferentes status. Uma issue com o status `backlog` ainda não foi refinada e não está pronta para ser iniciada. Uma issue com status `ready` já foi refinada e está pronta para ser iniciada.

## Assumindo uma issue

Acesse a issue que você quer trabalhar e adicione um comentário do tipo "vou trabalhar nisso". </br>
Se você não abrir PR em até 14 dias após assumir a issue, ela será liberada para outra pessoa.

## Pull Request

Para finalizar uma issue, será necessário fazer um `pull request`. </br>
Veja abaixo o passo a passo…

1 - Crie uma branch, seguindo esse padrão `<type>/<nome-da-branch>` </br>
2 - Faça as alterações e sincronize sua branch com upstream, seguindo esses passos: </br>
2.1 - Faça checkout para a main </br>
2.2 - Execute `git pull upstream main --rebase` </br>
2.3 - Faça checkout de volta para sua branch </br>
2.4 - Execute o comando `git rebase main` na sua branch de trabalho </br>
3 - Faça push para origin executando `git push origin type/nome-branch` </br>
4 - Vá para o repositório do projeto e abra um pull request </br>

Pronto! Agora é só esperar a revisão da sua contribuição por outros colaboradores do projeto. Quando tiver mudanças para fazer após a revisão do seu código, basta fazer as alterações necessárias e fazer um novo push, isso ira automaticamente atualizar o PR, você não precisa abrir um novo. </br>
Quando tudo estiver certo um mantenedor do repositório irá fazer o merge da sua contribuição.

## Code review

Mesmo não sendo um mantenedor do repositório, você também pode revisar os pull requests, apontando erros que encontrou enquanto lia o código ou testava a implementação.
Se você não tem muita experiência com essa prática, esse documento pode te ajudar. </br>
[Boas práticas code review](https://goldenrod-pen-c7d.notion.site/Boas-pr-ticas-code-review-5cc604dadb9f4571b2a50ef5ba598045)

## Gerenciamento do projeto

Você pode ter uma visão maior sobre o andamento e gerenciamento do projeto acessando a seção [projects](https://github.com/users/d3vlopes/projects/13)

<img width="1280" height="894" alt="image" src="https://github.com/user-attachments/assets/c514a36a-17a7-48de-ad71-4e1cf956db8e" />

## Testes

Se você pegar uma issue que exiga testes é importante você criar uma boa suite de testes. Se você não tem muita experiência com com testes, recomendo utilizar a extensão para VSCode [Qodo Gen: AI Coding Agent](https://marketplace.visualstudio.com/items?itemName=Codium.codium) para te ajudar a criar os testes.

## Utilize os exemples como referência

Tanto o frontend como o backend contém `examples` para você utilizar como base e entender como tudo se conecta no projeto. Quando for criar um novo recurso utilize eles como referência.

## Discord

Acesse nosso [Discord](https://discord.gg/55e3kf6DPv) para conhecer novas pessoas, pedir ajuda e ficar por dentro da novidades do projeto.
