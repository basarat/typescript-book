## Changelog 
> Reading a markdown file with the progress in the project is easier than reading a commit log.

Automatic changelog generation from commit messages is a fairly common pattern nowadays. There is a project called [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) that generates a changelog from commit messages that follow a *convention*. 

### Commit message convention
The most common convention is the *angular* commit messages convention which is [detailed here](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

### Setup
* Install: 

```bash
npm install standard-version -D
```

* Add a `script` target to your `package.json`: 

```js
{
  "scripts": {
    "release": "standard-version"
  }
}
```

* Optionally : To automatically push the new *git commit and tag* plus publish to npm add a `postrelease` script: 

```js
{
  "scripts": {
    "release": "standard-version",
    "postrelease": "git push --follow-tags origin master && npm publish"
  }
}
```

### Releasing 

Simply run: 

```bash
npm run release
```

Based on the commit messages `major` | `minor` | `patch` is automatically determined. To *explicitly* specify a version you can specify `--release-as` e.g.: 

```bash
npm run release -- --release-as minor
```
