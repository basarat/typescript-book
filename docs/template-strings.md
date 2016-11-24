### Template Strings
Syntactically these are strings that use backticks ( i.e. \` ) instead of single (') or double (") quotes. The motivation of Template Strings is three fold:

* String Interpolation
* Multiline Strings
* Tagged Templates

#### String Interpolation
Another common use case is when you want to generate some string out of some static strings + some variables. For this you would need some *templating logic* and this is where *template strings* get their name from. Here's how you would potentially generate an html string previously:

```ts
var lyrics = 'Never gonna give you up';
var html = '<div>' + lyrics + '</div>';
```
Now with template strings you can just do:

```ts
var lyrics = 'Never gonna give you up';
var html = `<div>${lyrics}</div>`;
```

Note that any placeholder inside the interpolation (`${` and `}`) is treated as a JavaScript expression and evaluated as such e.g. you can do fancy math.

```ts
console.log(`1 and 1 make ${1 + 1}`);
```

#### Multiline Strings
Ever wanted to put a newline in a JavaScript string? Perhaps you wanted to embed some lyrics? You would have needed to *escape the literal newline* using our favorite escape character `\`, and then put a new line into the string manually `\n` at the next line. This is shown below:

```ts
var lyrics = "Never gonna give you up \
\nNever gonna let you down";
```

With TypeScript you can just use a template string:

```ts
var lyrics = `Never gonna give you up
Never gonna let you down`;
```

#### Tagged Templates

You can place a function (called a `tag`) before the template string and it gets the opportunity to pre process the template string literals plus the values of all the placeholder expressions and return a result. A few notes:
* All the static literals are passed in as an array for the first argument.
* All the values of the placeholders expressions are passed in as the remaining arguments. Most commonly you would just use rest parameters to convert these into an array as well.

Here is an example where we have a tag function (named `htmlEscape`) that escapes the html from all the placeholders:

```ts
var say = "a bird in hand > two in the bush";
var html = htmlEscape `<div> I would just like to say : ${say}</div>`;

// a sample tag function
function htmlEscape(literals, ...placeholders) {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // add the last literal
    result += literals[literals.length - 1];
    return result;
}
```

#### Generated JS
For pre ES6 compile targets the code is fairly simple. Multiline strings become escaped strings. String interpolation becomes *string concatenation*. Tagged Templates become function calls.

#### Summary
Multiline strings and string interpolation are just great things to have in any language. It's great that you can now use them in your JavaScript (thanks TypeScript!). Tagged templates allow you to create powerful string utilities.
