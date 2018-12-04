# TypeScript com Node.js
O TypeScript tem suporte de *primeira classe* para o Node.js desde o início. Veja como configurar um projeto rápido do Node.js:

> Nota: muitas dessas etapas são na verdade apenas práticas comuns de configuração do Node.js

1. Configure um projeto do Node.js `package.json`. Início rápido: `npm init -y`
1. Adicione o TypeScript (`npm install typescript --save-dev`)
1. Adicione o `node.d.ts` (` npm install @ types / node --save-dev`)
1. Inicie um `tsconfig.json` para opções do TypeScript com algumas opções-chave em seu tsconfig.json (npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6, dom --module commonjs`)

É isso aí! Abra seu IDE (por exemplo, `code .`) e divirta-se. Agora você pode usar todos os módulos de Node embutidos (por exemplo, `import * as fs from 'fs';`) com toda a segurança e ergonomia do desenvolvedor do TypeScript!

Todo o seu código TypeScript entra em `src` e o JavaScript gerado vai em `lib`.

## Bônus: Live compile + run
* Adicione o `ts-node`, que usaremos para compilar ao vivo + executar no nó (`npm install ts-node --save-dev`)
* Adicionar `nodemon` que irá invocar `ts-node` sempre que um arquivo for alterado (`npm install nodemon --save-dev`)

Agora apenas adicione um alvo `script` ao seu `package.json` baseado na sua entrada de aplicativo, por exemplo assumindo seu `index.ts`:

```json
  "scripts": {
    "start": "npm run build:live",
    "build": "tsc -p .",
    "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts"
  },
```

Então você pode agora executar o `npm start` e editar o` index.ts`:

* nodemon executa novamente seu comando (ts-node)
* ts-node transpila automaticamente pegando o tsconfig.json e a versão do TypeScript instalada,
* O ts-node executa a saída JavaScript através do Node.js.

E quando você estiver pronto para implantar seu aplicativo JavaScript, execute `npm run build`.

## Criando módulos Node do TypeScript

* [Uma lição sobre a criação de módulos Node do TypeScript](https://egghead.io/lessons/typescript-create-high-quality-npm-packages-using-typescript)

Usando módulos escritos em TypeScript é super divertido, pois você obtém segurança em tempo de compilação e um autocomplete (essencialmente, documentação executável).

Criar um módulo TypeScript de alta qualidade é simples. Assuma a seguinte estrutura de pastas desejada para o seu pacote:

```text
package
├─ package.json
├─ tsconfig.json
├─ src
│  ├─ Todos os seus arquivos de origem
│  ├─ index.ts
│  ├─ foo.ts
│  └─ ...
└─ lib
  ├─ Todos os seus arquivos de origem
  ├─ index.d.ts
  ├─ index.js
  ├─ foo.d.ts
  ├─ foo.js
  └─ ...
```


* Em seu arquivo `tsconfig.json`
  * contem `compilerOptions`: `"outDir": "lib"` e `"declaration": true` < Isso gera declaração e arquivos js na pasta lib
  * contem `include: ["./src/**/*"]` < Isso inclui todos os arquivos do diretório `src`.

* Em seu arquivo `package.json` contem
  * `"main": "lib/index"` < Isso diz ao Node.js para carregar `lib/index.js`
  * `"types": "lib/index"` < Isto diz ao TypeScript para carregar `lib/index.d.ts`


Exemplo de pacote:
* `npm install typestyle` [para TypeStyle](https://www.npmjs.com/package/typestyle)
* Usando: `import { style } from 'typestyle';` será completamente seguro.

MAIS:

* Se o seu pacote depende de outros pacotes criados por TypeScript, coloque-os em `dependencies`/`devDependencies`/`peerDependencies` como você faria com pacotes brutos do JS.
* Se o seu pacote depender de outros pacotes criados por JavaScript e você quiser usá-lo com o tipo de segurança em seu projeto, coloque seus tipos (por exemplo `@types/foo`) em `devDependencies`. Os tipos JavaScript devem ser gerenciados *fora do limite* dos fluxos principais do NPM. O ecossistema JavaScript quebra tipos sem versionamento semântico muito comumente, então, se seus usuários precisarem de tipos para eles, eles devem instalar a versão `@types/foo` que funciona para eles.

## Pontos bônus

Esses módulos NPM funcionam muito bem com o browserify (usando o tsify) ou o webpack (usando o ts-loader).
