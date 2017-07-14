### Trivia
Trivia (called that because it's `trivial`) represent the parts of the source text that are largely insignificant for normal understanding of the code. For example; whitespace, comments, and even conflict markers. Trivia is *not stored* in the AST (to keep it lightweight). However it can be fetched *on demand* using a few `ts.*` APIs. 

Before we show them you need to understand the following:

#### Trivia Ownership
In General:
* A token owns any trivia after it on the *same* line *upto* the next token.
* Any comment *after that line* is associated with the following token.

For leading and ending comments in a file:
* The first token in the source file gets all the initial trivia.
* The last sequence of trivia in the file is tacked onto the end-of-file token, which otherwise has zero width.

#### Trivia APIs
For most basic uses, comments are the "interesting" trivia. The comments that belong to a Node can be fetched through the following functions:

Function | Description
---------|------------
`ts.getLeadingCommentRanges` | Given the source text and position within that text, returns ranges of comments between the first line break following the given position and the token itself (probably most useful with `ts.Node.getFullStart`).
`ts.getTrailingCommentRanges` | Given the source text and position within that text, returns ranges of comments until the first line break following the given position (probably most useful with `ts.Node.getEnd`).

As an example, imagine this portion of a source file:

```ts
debugger;/*hello*/
    //bye
  /*hi*/    function
```

`getLeadingCommentRanges` for the `function` will only return the last 2 comments `//bye` and `/*hi*/`.

Appropriately, calling `getTrailingCommentRanges` on the end of the debugger statement will extract the `/*hello*/` comment.

#### Token Start/Full Start
Nodes have what is called a "token start" and a "full start".

* Token Start: the more natural version, which is the position in file where the text of a token begins
* Full Start: the point at which the scanner began scanning since the last significant token

AST nodes have an API for `getStart` and `getFullStart`. In the following example:

```ts
debugger;/*hello*/
    //bye
  /*hi*/    function
```
for `function` the token start is at `function` whereas *full* start is at `/*hello*/`. Note that full start even includes the trivia that would otherwise be owned by the previous node.
