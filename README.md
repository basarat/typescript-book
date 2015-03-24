TypeScript Deep Dive
=======

I've been looking at the issues that turn up commonly when people start using TypeScript. This is based on the lessons from [StackOverflow](http://stackoverflow.com/tags/typescript/topusers) / [DefinitelyTyped](https://github.com/DefinitelyTyped/) and general engagement with the [TypeScript community](https://github.com/TypeStrong/).

### Book Development

This book is developed using [GitBook](https://github.com/GitbookIO/gitbook). Authored in Markdown files (I use [atom](http://atom.io)).

Here's how to setup a Dev Environment:

```
$ npm install gitbook-cli -g
$ gitbook serve .
```
Note: serve needs port `35729` (for live reload) and `4000` for serving http://localhost:4000.

Also you can mostly just edit the `.md` files in [`/docs`](https://github.com/basarat/typescript-book/docs) using github and create a Pull Request (PR).

You can also:
* [Download the epub for iPad,iPhone,Mac](https://www.gitbook.com/download/epub/book/basarat/typescript)
* [Download the PDF for Windows and others](https://www.gitbook.com/download/pdf/book/basarat/typescript)
* [Download the MOBI for Kindle](https://www.gitbook.com/download/mobi/book/basarat/typescript)
* [Read the book online](http://basarat.gitbooks.io/typescript/)

Your feedback on this [work is highly appreciated](https://twitter.com/basarat).
