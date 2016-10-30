## Generics in TSX 

Because `.tsx` / `.jsx` uses syntax like `<div>` to denote JSX blocks it offers a few unique challenges for Generics. 

> Quick Tip:  Use `as Foo` syntax for type assertions as we mentioned before


### Generic functions

Something like the following works fine: 

```ts
function foo<T>(x: T): T { return x; }
```

However using an arrow generic function will not: 

```ts
const foo = <T>(x: T) => x; // ERROR : unclosed `T` tag
```

**Workaround**: Use `extends` on the generic parameter to hint the compiler that its a generic. e.g.

```ts
const foo = <T extends {}>(x: T) => x;
```

### Generic Components 

Since JSX doesn't have a syntax for providing a generic parameter you need to specialize the component using a type assertion before creation it. e.g. 

```ts
/** Generic component */
type SelectProps<T> = { items: T[] }
class Select<T> extends React.Component<SelectProps<T>, any> { }

/** Specialization */
interface StringSelect { new (): Select<string> } ;
const StringSelect = Select as StringSelect;

/** Usage */
const Form = ()=> <StringSelect items={['a','b']} />;
```
