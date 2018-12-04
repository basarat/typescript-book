# Por que o TypeScript
Existem dois objetivos principais do TypeScript:
* Fornecer um *sistema de tipo opcional* para JavaScript.
* Fornecer recursos planejados de futuras edições do JavaScript para os mecanismos JavaScript atuais

O desejo por essas metas é motivado abaixo.

## O tipo de sistema do TypeScript

Você pode estar se perguntando "**Por que adicionar tipos ao JavaScript?**"

Os tipos têm capacidade comprovada de aprimorar a qualidade e a inteligibilidade do código. Grandes equipes (Google, Microsoft, Facebook) chegaram continuamente a essa conclusão. Especificamente:

* Tipos aumentam sua agilidade ao fazer a refatoração. *É melhor para o compilador detectar erros do que fazer as coisas falharem no tempo de execução*.
* Os tipos são uma das melhores formas de documentação que você pode ter. *A assinatura da função é um teorema e o corpo da função é a prova*.

No entanto, os tipos têm um jeito de ser desnecessariamente cerimonioso. O TypeScript é muito particular em manter a barreira de entrada tão baixa quanto possível. Veja como:

### Seu JavaScript é o TypeScript
O TypeScript fornece segurança de tipo de tempo de compilação para o seu código JavaScript. Isso não é surpresa, dado seu nome. O melhor é que os tipos são completamente opcionais. O seu arquivo JavaScript `.js` pode ser renomeado para um arquivo` .ts` e o TypeScript ainda lhe dará um `.js` válido equivalente ao arquivo JavaScript original. O TypeScript é *intencionalmente* e estritamente um superconjunto de JavaScript com verificação de Tipo opcional.

### Tipos podem ser Implícitos
O TypeScript tentará inferir o máximo possível das informações de tipo para fornecer segurança ao tipo com custo mínimo de produtividade durante o desenvolvimento do código. Por exemplo, no exemplo a seguir, o TypeScript saberá que foo é do tipo `number` e abaixo dará um erro na segunda linha, conforme mostrado:

```ts
var foo = 123;
foo = '456'; // Erro: não é possível atribuir `string` a `number` (Error: cannot assign `string` to `number`)

// foo é um número ou uma string?
```
Este tipo de inferência é bem motivado. Se você fizer coisas como mostrado neste exemplo, então, no resto do seu código, você não pode ter certeza que `foo` é um` number` ou `string`. Tais problemas aparecem frequentemente em grandes bases de código multi-arquivos. Vamos aprofundar as regras de inferência de tipos mais tarde.

### Tipos podem ser Explícitos
Como mencionamos anteriormente, o TypeScript inferirá tanto quanto puder com segurança. No entanto, você pode usar anotações para:
1. Ajude junto com o compilador, e mais importante, documente o material para o próximo desenvolvedor que tenha que ler seu código (que pode ser o seu futuro!).
1. Exija que o que o compilador vê seja o que você achou que deveria ver. Essa é a sua compreensão do código corresponde a uma análise algorítmica do código (feito pelo compilador).

O TypeScript usa anotações do tipo postfix populares em outras linguagens *opcionalmente* anotadas (por exemplo: ActionScript e F #).

```ts
var foo: number = 123;
```
Então, se você fizer algo errado, o compilador vai disparar um erro, por exemplo:

```ts
var foo: number = '123'; // Erro: não é possível atribuir `string` a `number` (Error: cannot assign `string` to `number`)
```

Discutiremos todos os detalhes de toda a sintaxe de anotação suportada pelo TypeScript em um capítulo posterior.

### Tipos são Estruturais
Em algumas linguagens (especificamente as tipificadas nominalmente), a tipagem estática resulta em uma cerimônia desnecessária, porque mesmo que *você saiba* que o código funcionará bem, a semântica da linguagem força você a copiar coisas. É por isso que coisas como [automapper para o C#](http://automapper.org/) sejam *vitais* para o C#. No TypeScript, porque realmente queremos que seja fácil para os desenvolvedores de JavaScript com uma sobrecarga cognitiva mínima, os tipos são *estruturais*. Isso significa que *duck typing* é uma construção de linguagem de primeira classe. Considere o seguinte exemplo. A função `iTakePoint2D` aceitará qualquer coisa que contenha todas as coisas (`x` e `y`) que ele espera:

```ts
interface Point2D {
    x: number;
    y: number;
}
interface Point3D {
    x: number;
    y: number;
    z: number;
}
var point2D: Point2D = { x: 0, y: 10 }
var point3D: Point3D = { x: 0, y: 10, z: 20 }
function iTakePoint2D(point: Point2D) { /* faça alguma coisa */ }

iTakePoint2D(point2D); // correspondência exata 👉 bem
iTakePoint2D(point3D); // informação extra 👉 bem
iTakePoint2D({ x: 0 }); // Erro: falta de informação `y`
```

### Tipos de Erros não impedem o uso do JavaScript
Para facilitar a migração do seu código JavaScript para o TypeScript, mesmo se houver erros de compilação, por padrão, o TypeScript *emitirá JavaScript* válido o melhor que puder. Por exemplo:

```ts
var foo = 123;
foo = '456'; // Erro: não é possível atribuir `string` a `number` (Error: cannot assign `string` to `number`)
```

emitirá o seguinte js:

```ts
var foo = 123;
foo = '456';
```

Então você pode incrementalmente atualizar seu código JavaScript para o TypeScript. Isso é muito diferente de quanto o funcionamento de outros compiladores de outras linguagens e este é mais um motivo para migrar para o TypeScript.

### Tipos podem ser ambiente
Um dos principais objetivos de design do TypeScript era possibilitar que você usasse com segurança e facilidade as bibliotecas JavaScript existentes no TypeScript. O TypeScript faz isso por meio de *declaração*. O TypeScript fornece a você uma escala variável de quanto ou quão pouco esforço você deseja colocar em suas declarações, quanto mais esforço você colocar, mais inteligência de código de segurança de tipo será obtida. Observe que as definições para a maioria das bibliotecas JavaScript populares já foram escritas para você pela [comunidade DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped), portanto para a maioria dos propósitos:

1. O arquivo de definição já existe.
1. Ou, pelo menos, você tem uma vasta lista de modelos de declaração TypeScript bem revisados já disponíveis

Como um exemplo rápido de como você criaria seu próprio arquivo de declaração, considere um exemplo trivial de [jquery](https://jquery.com/). Por padrão (como é de se esperar de um bom código JS), o TypeScript espera que você declare (isto é, use `var` em algum lugar) antes de usar uma variável
```ts
$('.awesome').show(); // Erro: não é possível encontrar o nome `$`(Error: cannot find name `$`)
```
Como uma solução rápida *você pode dizer ao TypeScript* que existe algo chamado `$`:
```ts
declare var $: any;
$('.awesome').show(); // Okay!
```
Se você quiser, pode construir sobre esta definição básica e fornecer mais informações para ajudar a protegê-lo contra erros:
```ts
declare var $: {
    (selector:string): any;
};
$('.awesome').show(); // Okay!
$(123).show(); // Erro: o seletor precisa ser uma string(Error: selector needs to be a string)
```

Discutiremos os detalhes da criação de definições de TypeScript para o JavaScript existente em detalhes mais tarde, assim que você souber mais sobre o TypeScript(por exemplo, coisas como `interface` e` any`).

## Futuro JavaScript => Agora
O TypeScript fornece vários recursos planejados no ES6 para os mecanismos JavaScript atuais(que suportam apenas o ES5, etc.). A equipe do TypeScript está ativamente adicionando esses recursos e essa lista só vai aumentar ao longo do tempo e nós cobriremos isso em sua própria seção. Mas, assim como um espécime aqui está um exemplo de uma classe:

```ts
class Point {
    constructor(public x: number, public y: number) {
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // { x: 10, y: 30 }
```

e a adorável função de flecha gorda:

```ts
var inc = x => x+1;
```

### Resumo
Nesta seção, fornecemos a motivação e os objetivos de design do TypeScript. Com isso fora do caminho, podemos nos aprofundar nos detalhes básicos do TypeScript.

[] (Interfaces estão abertas)
[] (Regras de inferência de tipos)
[] (Cobrir todas as anotações)
[] (Cubra todos os ambientes: também que não haja execução de tempo de execução)
[] (. ts vs. .d.ts)