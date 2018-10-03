# Prettier 

Prettier is a great tool by facebook that makes code formatting so much easier that it's worth mentioning. Setting up with TypeScript using our recommended project setup (aka everything in `src` folder) is super easy: 

## Setup 

* `npm install prettier -D` 
* Add `scripts` to `package.json`: 

```
    "prettier:base": "prettier --parser typescript --single-quote",
    "prettier:check": "npm run prettier:base -- --list-different \"src/**/*.{ts,tsx}\"",
    "prettier:write": "npm run prettier:base -- --write \"src/**/*.{ts,tsx}\""
```

## Usage 
On your build server: 
* `npm run prettier:check` 

During dev (or pre commit hook): 
* `npm run prettier:write`
