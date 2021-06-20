# Contributing

This book is developed using [GitBook](https://github.com/GitbookIO/gitbook). Authored in Markdown files (I use [atom](http://atom.io)).

Here's how to setup a Dev Environment:

```
npm install gitbook-cli -g
gitbook install
gitbook serve .
```
> Note: serve needs port `35729` (for live reload) and `4000` for serving http://localhost:4000.

Also you can mostly just edit the `.md` files in [`/docs`](https://github.com/basarat/typescript-book/docs) using github and create a Pull Request (PR).

# Code
All the code for the book is in the `/code` folder. Tested with `atom-typescript`.

### More Gitbook Tips
* Links best work if they are relative (e.g. `./foo.md`) to the *current* file.
* For links in the same file (`#foo-bar` style links) best to click the heading on github to get what gitbook expects.

### TypeScript Compiler Docs
Thanks to the TypeScript team for providing much of the docs: https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview that are used to write the compiler story.
