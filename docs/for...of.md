### for...of
A common error experienced by beginning JavaScript developers is that `for...in` for an array does not iterate over the array items. Instead it iterates over the *keys* of the object passed in. This is demonstrated in the below example. Here you would expect `9,2,5` but you get the indexes `0,1,2`:

```ts
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
```

This is one of the reasons why `for...of` exists in TypeScript (and ES6). The following iterates over the array correctly logging out the members as expected:

```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9,2,5
}
```

Similarly TypeScript has no trouble going through a string character by character using `for...of`:

```ts
var hello = "is it me you're looking for?";
for (var char of hello) {
    console.log(char); // is it me you're looking for?
}
```

#### JS Generation
For pre ES6 targets TypeScript will generate the standard `for (var i = 0; i < list.length; i++)` kind of loop. For example here's what gets generated for our previous example:
```ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item);
}

// becomes //

for (var _i = 0; _i < someArray.length; _i++) {
    var item = someArray[_i];
    console.log(item);
}
```
You can see that using `for...of` makes *intent* clearer and also decreases the amount of code you have to write (and variable names you need to come up with).

#### Limitations
If you are not targeting ES6 or above, the generated code assumes the property `length` exists on the object and that the object can be indexed via numbers e.g. `obj[2]`. So it is only supported on `string` and `array` for these legacy JS engines.

If TypeScript can see that you are not using an array or a string it will give you a clear error *"is not an array type or a string type"*;
```ts
let articleParagraphs = document.querySelectorAll("article > p");
// Error: Nodelist is not an array type or a string type
for (let paragraph of articleParagraphs) {
    paragraph.classList.add("read");
}
```

Use `for...of` only for stuff that *you know* to be an array or a string. Note that this limitation might be removed in a future version of TypeScript.

#### Summary
You would be surprised at how many times you will be iterating over the elements of an array. The next time you find yourself doing that, give `for...of` a go. You might just make the next person who reviews your code happy.
