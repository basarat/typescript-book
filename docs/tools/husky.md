# Husky 

> Husky can prevent bad commits, pushes and more 🐶!

If you want to run some JavaScript / TypeScript code before a commit takes place, husky is the tool for that. 

For example, you can use husky to make sure files are formatted by prettier automatically so you don't have to worry about manually formatting files ever again and focus on the objective of the code instead. Here is the setup: 

* `npm install husky -D`
* Add `scripts` to `package.json`: 

```
    "precommit": "npm run prettier:write",
```

Now whenever you commit code and there are any formatting changes that need to be made, you'd get them as a *modified* file in your git log. You can now 

* If you have pushed your code already, simply commit them with a comment `pretty`.
* If you haven't pushed your code, amend your last commit and look like a superhero.
