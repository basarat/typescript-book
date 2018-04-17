## Changelog 
> Reading a markdown file with the progress in the project is easier than reading a commit log.

Automatic changelog generation from commit messages is a fairly common pattern nowadays. There is a project called [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) that generates a changelog from commit messages that follow a *convention*. 

### Commit message convention
The most common convention is the *angular* commit messages convention which is [detailed here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

### Setup
* Install: 

```
npm install conventional-changelog -D
```

* Generate an initial `CHANGELOG.md`:

```
npx conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```

* Then keep it updated by adding a `script` target to your `package.json`: 

```
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
```

And now you can add `npm run changelog` to your build / push / release process to keep it up to date.
