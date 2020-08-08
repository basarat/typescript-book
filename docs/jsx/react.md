# React JSX

> [Бесплатная серия видео на YouTube о лучших React / TypeScript практиках](https://www.youtube.com/watch?v=7EW67MqgJvs&list=PLYvdvJlnTOjHNayH7MukKbSJ6PueUNkkG)

> [PRO Egghead курс по TypeScript и React](https://egghead.io/courses/use-typescript-to-develop-react-applications)

[![DesignTSX](https://raw.githubusercontent.com/basarat/typescript-book/master/images/designtsx-banner.png)](https://designtsx.com)

## Настройка

Наше [краткое руководство по браузеру уже позволяет вам разрабатывать react приложения](../quick/browser.md). Вот важные моменты:

* Используйте файлы с расширением `.tsx` (вместо `.ts`).
* Используйте `"jsx": "react"` в `compilerOptions` вашего конфига `tsconfig.json`.
* Установите определения для JSX и React в свой проект: (`npm i -D @types/react @types/react-dom`).
* Импортируйте react в ваши `.tsx` файлы (`import * as React from "react"`).

## HTML теги против Components

React может отображать либо HTML-теги (строки) либо компоненты React. Итоговый код JavaScript для этих элементов отличается (`React.createElement('div')` против `React.createElement(MyComponent)`). Это определяется *регистром* *первой* буквы. `foo` распознаётся как тег HTML, а `Foo` как компонент.

## Проверка типа

### HTML теги

HTML-тег `foo` должен иметь тип `JSX.IntrinsicElements.foo`. Эти типы уже определены для всех основных тегов в файле `react-jsx.d.ts`, который вы установили. Вот пример содержимого файла:

```ts
declare module JSX {
    interface IntrinsicElements {
        a: React.HTMLAttributes;
        abbr: React.HTMLAttributes;
        div: React.HTMLAttributes;
        span: React.HTMLAttributes;

        /// и так далее ...
    }
}
```

### Функциональные компоненты

Вы можете определить функциональные компоненты просто с помощью `React.FunctionComponent` интерфейса, например:

```ts
type Props = {
  foo: string;
}
const MyComponent: React.FunctionComponent<Props> = (props) => {
    return <span>{props.foo}</span>
}

<MyComponent foo="bar" />
```

###  Классовые компоненты

Компоненты проверяются по типу на основе свойства компонента `props`. Это формируется после того, как JSX преобразуется, т.е. атрибуты становятся `свойствами` компонента.

Файл `react.d.ts` определяет `React.Component<Props,State>` класс, который вы должны расширить в своем собственном классе, предоставляя свои собственные  `Props` и `State` интерфейсы. Это показано ниже:

```ts
type Props = {
  foo: string;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>
    }
}

<MyComponent foo="bar" />
```

### React JSX совет: интерфейс для рендеринга

React может рендерить несколько вещей, например `JSX` или `string`. Все они объединены в тип `React.ReactNode`, поэтому используйте его, когда вы хотите принимать рендеримые объекты, например:

```ts
type Props = {
  header: React.ReactNode;
  body: React.ReactNode;
}
class MyComponent extends React.Component<Props, {}> {
    render() {
        return <div>
            {this.props.header}
            {this.props.body}
        </div>;
    }
}

<MyComponent header={<h1>Header</h1>} body={<i>body</i>} />
```

### React JSX cовет: принять экземпляр Component

В react определениях типов есть `React.ReactElement<T>`, чтобы вы могли описывать результат создания экземпляра компонента класса `<T/>`. Например:

```js
class MyAwesomeComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const foo: React.ReactElement<MyAwesomeComponent> = <MyAwesomeComponent />; // Okay
const bar: React.ReactElement<MyAwesomeComponent> = <NotMyAwesomeComponent />; // Ошибка!
```

> Конечно, вы можете использовать это для описания параметра функции и даже как свойство компонента React.

### React JSX совет: принять *компонент*, который может воздействовать на свойства и рендериться с помощью JSX

Тип `React.Component<Props>` объединяет `React.ComponentClass<P> | React.StatelessComponent<P>` так что вы можете принять *что-то*, что требует типы `Props` и отрендерить его с помощью JSX, например:

```ts
const X: React.Component<Props> = foo; // откуда-то

// Рендерим X с некоторыми свойствами:
<X {...props}/>;
```

### React JSX совет: обобщённые компоненты

Работает именно так, как ожидалось. Вот пример:

```ts
/** обобщённый компонент */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Использование */
const Form = () => <Select<string> items={['a','b']} />;
```

### Обобщённые функции

Что-то вроде следующего отлично работает:

```ts
function foo<T>(x: T): T { return x; }
```

Однако использование обобщённой стрелочной функции приведет к:

```ts
const foo = <T>(x: T) => x; // ОШИБКА : незакрытый тег `T`
```

**Решение**: используйте `extends` чтобы сказать компилятору, что это обобщённый параметр, например:

```ts
const foo = <T extends unknown>(x: T) => x;
```

### React JSX совет: строго типизированные refs
Вы в основном инициализируете переменную как объединение ref и `null`, а затем инициализируете ее как колбэк, например:

```ts
class Example extends React.Component {
  example() {
    // ... что-то
  }
  
  render() { return <div>Foo</div> }
}


class Use {
  exampleRef: Example | null = null; 
  
  render() {
    return <Example ref={exampleRef => this.exampleRef = exampleRef } />
  }
}
```

И то же самое с ref для собственных элементов, например.

```ts
class FocusingInput extends React.Component<{ value: string, onChange: (value: string) => any }, {}>{
  input: HTMLInputElement | null = null;
    
  render() {
    return (
      <input
        ref={(input) => this.input = input}
        value={this.props.value}
        onChange={(e) => { this.props.onChange(e.target.value) } }
        />
      );
    }
    focus() {
      if (this.input != null) { this.input.focus() }
    }
}
```

### Утверждения типа

Используйте синтаксис `as Foo` для утверждений типов, как мы [упоминали ранее](../types/type-assertion.md#as-foo-vs-foo).

## Свойства по умолчанию

* Stateful компоненты со свойствами по умолчанию: Вы можете сообщить TypeScript, что свойство будет предоставлено извне (посредством React), используя оператор *null assertion* (это не идеальный вариант, но это простейшее решение с минимальным *дополнительным кодом*, которое я смог придумать).

```tsx
class Hello extends React.Component<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> {
  static defaultProps = {
    compiler: 'TypeScript'
  }
  render() {
    const compiler = this.props.compiler!;
    return (
      <div>
        <div>{compiler}</div>
        <div>{this.props.framework}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

* Функциональные stateless компоненты со свойствами по умолчанию: рекомендуется использовать простые шаблоны JavaScript, поскольку они хорошо работают с системой типов TypeScript, например:

```tsx
const Hello: React.SFC<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string,
  framework: string
}> = ({
  compiler = 'TypeScript', // Свойство по умолчанию
  framework
}) => {
    return (
      <div>
        <div>{compiler}</div>
        <div>{framework}</div>
      </div>
    );
  };


ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

## Объявление веб-компонента

Если вы используете веб-компонент, определения типа React по умолчанию (`@types/react`) не будут знать об этом. Но вы можете легко сказать об этом, например чтобы объявить веб-компонент под названием `my-awesome-slider`, который принимает Props `MyAwesomeSliderProps`, вы должны:

```tsx
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-awesome-slider': MyAwesomeSliderProps;
    }

    interface MyAwesomeSliderProps extends React.Attributes {
      name: string;
    }
  }
}
```

Теперь вы можете использовать его в TSX:

```tsx
<my-awesome-slider name='amazing'/>
```
