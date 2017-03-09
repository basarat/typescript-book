## Creating arrays

Creating an empty array is super easy: 

```ts
const foo:string[] = [];
```

If you want to create an array pre-filled with some content use the ES6 `Array.prototype.fill`: 

```ts
const foo:string[] = new Array(3).fill('');
console.log(foo); // ['','',''];
```
