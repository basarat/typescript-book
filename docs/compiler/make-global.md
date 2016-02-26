## Make TypeScript Global

TypeScript is written using a `namespace ts`. And then the whole compiler is compiled into a single `typescript.js` file. If you want to copy over parts of the source code for exploration a great way to do that is to copy over the portions that you are exploring and then expose them to the global variable `ts`.

A great way to play around with the TypeScript compiler is just to copy the TypeScript compiler source into a folder and then reference it as a `global` variable.
