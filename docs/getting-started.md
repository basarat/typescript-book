* [Iniciando no TypeScript](#iniciando-no-typescript)
* [Versão do TypeScript](#typescript-version)

# Iniciando no TypeScript

O TypeScript é compilado em JavaScript. Na verdade, é o JavaScript que você irá executar (tanto no navegador como no servidor). Então, você irá precisar do seguinte:

* Compilador de TypeScript [disponível na fonte](https://github.com/Microsoft/TypeScript/) e via [NPM](https://www.npmjs.com/package/typescript))
* Um editor de TypeScript (você pode usar o bloco de notas se quiser, mas eu uso o [vscode 🌹](https://code.visualstudio.com/) com uma [extensão escrita por mim](https://marketplace.visualstudio.com/items?itemName=basarat.god). [Muitas outras IDEs também suportam o TypeScript]( https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support))


## Versão do TypeScript 

Ao invés de usar compilador *stable* (estável) nós vamos estar apresentando muitas coisas novas neste livro que ainda podem não estar associadas com um número de versão. Eu geralmente recomendo as pessoas a usarem a *nightly version* porque **a Versão de testes só é capaz de capturar os bugs conforme é utilizada**.
Você pode instalar através da linha de comando com

```
npm install -g typescript@next
```

E agora o comando `tsc` irá ser o mais atual e o melhor. Várias IDEs tão suportam esta versão.

* Você pode pedir ao vscode para usar estar versão criando `.vscode/settings.json` com o seguinte conteúdo:

```json
{
  "typescript.tsdk": "./node_modules/typescript/lib"
}
```

## Acesso ao código fonte
O Código Fonte deste livro esta disponível no repositório de livros do github https://github.com/basarat/typescript-book/tree/master/code onde maior parte dos exemplos pode ser copiada para o vscode para que você possa treinar com eles. Para os exemplos que precisam de configurações adicionais nós iremos deixar um link para o exemplo antes de mostrar o código.

`este/sera/o/link/para/o/codigo.ts`
```ts
// Este será o código em discussão.

Com as configurações de desenvolvimento terminadas vamos pular para sintaxe do TypeScript. 
