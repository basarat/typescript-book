## References

자바스크립트에서 객체는 (functions, arrays, regexp etc)에 해당하고 이것은 다음을 의미합니다.

### 참조에 대한 레퍼런스

```js
var foo = {}
var bar = foo // bar is a reference to the same object

foo.baz = 123
console.log(bar.baz) // 123
```

### 참조에 대한 일치연산자 레퍼런스

```js
var foo = {}
var bar = foo // bar is a reference
var baz = {} // baz is a *new object* distinct from `foo`

console.log(foo === bar) // true
console.log(foo === baz) // false
```
