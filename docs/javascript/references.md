## رفرنس‌ها!!

در واقع هر آبجکتی در جاوااسکریپت ( که شامل فانکشن‌ها، آرایه‌ها و رجکس‌ها هم میشه) رفرنس هستن . میتونیم اینجوری بگیم که : 
Beyond literals, any Object in JavaScript (including functions, arrays, regexp etc) are references. This means the following

### هر تغییری که بدید تمام رفرنس‌ها از اون آبجکت هم تغییر می‌کنند

```js
var foo = {};
var bar = foo; // bar is a reference to the same object

foo.baz = 123;
console.log(bar.baz); // 123
```

### تساوی هم برای همه رفرنس‌ها از یک آبجکت برقراره

```js
var foo = {};
var bar = foo; // bar is a reference
var baz = {}; // baz is a *new object* distinct from `foo`

console.log(foo === bar); // true
console.log(foo === baz); // false
```
