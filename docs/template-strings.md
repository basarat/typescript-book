### Template Strings
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

// more than just multiline 
// also great for 

#### Summary 

{% include "footer.md" %}