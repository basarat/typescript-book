## Contributing

TypeScript is [OSS and on GitHub](https://github.com/Microsoft/TypeScript) and the team welcomes community input.

### Setup
Super easy:

```bash
git clone https://github.com/Microsoft/TypeScript.git
cd TypeScript
npm install -g jake
npm install
```

### Setup Fork
You would obviously need to setup Microsoft/TypeScript as an `upstream` remote and your own *fork* (use the GitHub *fork* button) as `origin`:

```bash
git remote rm origin
git remote rm upstream
git remote add upstream https://github.com/Microsoft/TypeScript.git
git remote add origin https://github.com/basarat/TypeScript.git
```
Additionally I like to work off branches like `bas/` to have it show up cleaner in the branch listings.

### Running Tests
There are lots of `test` and `build` options in their JakeFile. You can run *all* tests with `jake runtests`

### Baselines
Baselines are used to manage if there are any changes in the *expected* output of the TypeScript compiler. Baselines are located in `tests/baselines`.

* Reference (*expected*) baselines: `tests/baselines/reference`
* Generated (*in this test run*) baselines : `tests/baselines/local` (this folder is in **.gitignore**)

> If there are any differences between these folders tests will fail. You can diff the two folders with tools like BeyondCompare or KDiff3.

If you think these changes in generated files are valid then accept baselines using `jake baseline-accept`. The changes to `reference` baselines will now show as a git diff you can commit.

> Note that if you don't run *all* tests then use `jake baseline-accept[soft]` which will only copy over the new files and not delete the whole `reference` directory.

### Test Categories

There are different categories for different scenarios and even different test infrastructures. Here are a few of these explained.

#### Compiler Tests

These ensure that compiling a file :

* generates errors as expected
* generated JS as expected
* types are identified as expected
* symbols are identified as expected

These expectations are validated using the baselines infrastructure.

##### Creating a Compiler Test
Test can be created by adding a new file `yourtest.ts` to `tests/cases/compiler`. As soon as you do so and run the tests you should get baseline failure. Accept these baselines (to get them to show up in git), and tweak them to be what you *expect* them to be ... now get the tests to pass.

Run all of these in isolation using `jake runtests tests=compiler`, or just your new file using `jake runtests tests=compiler/yourtest`

I will even often do `jake runtests tests=compiler/yourtest || jake baseline-accept[soft]` and get the diff in `git`.

### Debugging Tests

`jake runtests-browser tests=theNameOfYourTest` and debugging in-browser usually works pretty well.

### More 
* An article by Remo : https://dev.to/remojansen/learn-how-to-contribute-to-the-typescript-compiler-on-github-through-a-real-world-example-4df0 🌹
