# Why Cypress
Cypress is a great E2E testing tool. Here are a few great reasons to consider it:

* Isolated installation possible.
* Ships with TypeScript support out of the box.
* Provides a nice interactive google chrome debug experience. This is very similar to how UI devs mostly work manually.
* Has command - execution separation which allows for more powerful debugging and test stability (more on this below).
* Has implicit assertions to provide more meaningful debug experience with less brittle tests (more on this in the tips below).
* Provides the ability to mock out and observe backend XHRs easily without changing your application code (more on this in the tips below).

## Installation
The steps provided in this installation process will give you a nice `e2e` folder that you can copy/paste or as boiler plate for your organization.

> Same steps presented in a video format over at my [youtube channel](https://www.youtube.com/watch?v=n3SvvZSWwfM).

Create an e2e directory, install cypress, TypeScript and setup the typescript and cypress config files:

```sh
mkdir e2e
cd e2e
npm init -y
npm install cypress typescript
npx tsc --init --types cypress --lib dom,es6
echo {} > cypress.json 
```

> Here are a few reasons for creating a separate `e2e` folder especially for cypress:
* Creating a separate directory or `e2e` makes it easier to isolate its `package.json` dependencies from the rest of your project. This results in less dependency conflicts.
* Testing frameworks have a habit of polluting the global namespace with stuff like `describe` `it` `expect`. It is best to keep the e2e `tsconfig.json` and `node_modules` in this special `e2e` folder to prevent global type definition conflicts.

Add a few scripts to the `e2e/package.json` file:

```json
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
```

Write your first test under `cypress/integration/basic.ts`: 

```ts
it('should perform basic google search', () => {
  cy.visit('https://google.com');
  cy.get('[name="q"]')
    .type('subscribe')
    .type('{enter}');
});
```

Now run `npm run cypress:open` during development and `npm run cypress:run` on your build server 🌹

## More description of key Files
Under the `e2e` folder you now have these files:

* `/cypress.json`: Configure cypress. The default is empty and that is all you need.
* `/cypress` Subfolders:
    * `/integration`: All your tests.
        * Feel free to create tests under subfolders for better organization e.g. `/someFeatureFolder/something.spec.ts`.

## First test
* create a file `/cypress/integration/first.ts` with the following contents:

```ts
describe('google search', () => {
  it('should work', () => {
    cy.visit('http://www.google.com');
    cy.get('#lst-ib').type('Hello world{enter}')
  });
});
```

## Running in development
Open the cypress IDE using the following command.

```sh
npm run cypress:open
```

And select a test to run.

## Running on a build server

You can run cypress tests in ci mode using the following command.

```sh
npm run cypress:run
```

## Tip: Sharing code between UI and test
Cypress tests are compiled / packed and run in the browser. So feel free to import any project code into your test.

For example you can share Id values between UI and Tests to make sure the CSS selectors don't break:

```js
import { Ids } from '../../../src/app/constants';

// Later
cy.get(`#${Ids.username}`)
  .type('john')
```

## Tip: Creating Page Objects
Creating objects that provide a convenient handle for all the interactions that various tests need to do with a page is a common testing convention. You can create page objects using TypeScript classes with getters and methods e.g.

```js
import { Ids } from '../../../src/app/constants';

class LoginPage {
  visit() {
    cy.visit('/login');
  }

  get username() {
    return cy.get(`#${Ids.username}`);
  }
}
const page = new LoginPage();

// Later
page.visit();

page.username.type('john');

```

## Tip: Explicit assertion
Cypress ships with (built in) chai and chai-query assertion libraries to help testing webpages. You use them with `.should` command passing in the chainer as a string, replacing `.to.foo` with `should('foo')` e.g. with chai-jquery you would `expect($(#foo)).to.have.text('something')`, with cypress you would `cy.get('#foo').should('have.text', 'something')`:

```
cy.get('#foo')
  .should('have.text', 'something')
```
> You get intellisense for `should` chainers as cypress ships with correct TypeScript definitions 👍🏻

The complete list of chainers is available here : https://docs.cypress.io/guides/references/assertions.html

If you want something complex you can even use `should(callback)` and e.g.

```
cy.get('div')
  .should(($div) => {
    expect($div).to.have.length(1);
    expect($div[0].className).to.contain('heading');
  })
// This is just an example. Normally you would `.should('have.class', 'heading')
```

> TIP: cypress with do automatic retries on the callback as well, so they are just as flake free as standard string chainers.

## Tip: Commands and Chaining
Every function call in a cypress chain is a `command`. The `should` command is an assertion. It is conventional to start distinct *category* of chains and actions separately e.g.

```ts
// Don't do this
cy.get(/**something*/)
  .should(/**something*/)
  .click()
  .should(/**something*/)
  .get(/**something else*/)
  .should(/**something*/)

// Prefer separating the two gets
cy.get(/**something*/)
  .should(/**something*/)
  .click()
  .should(/**something*/)

cy.get(/**something else*/)
  .should(/**something*/)
```

Some other libraries *evaluate and run* the code at the same time. Those libraries force you to have a single chain which can be nightmare to debug with selectors and assertions mingled in.

Cypress commands are essentially *declarations* to the cypress runtime to execute the commands later. Simple words: Cypress makes it easier.

## Tip: Using `contains` for easier querying

The following shows an example:

```
cy.get('#foo')
  // Once #foo is found the following:
  .contains('Submit')
  .click()
  // ^ will continue to search for something that has text `Submit` and fail if it times out.
  // ^ After it is found trigger a click on the HTML Node that contained the text `Submit`.
```

## Tip: Smart delays and retries
Cypress will automatically wait (and retry) for many async things e.g.
```
// If there is no request against the `foo` alias cypress will wait for 4 seconds automatically
cy.wait('@foo')
// If there is no element with id #foo cypress will wait for 4 seconds automatically and keep retrying
cy.get('#foo')
```
This keeps you from having to constantly add arbitrary timeout (and retry) logic in your test code flow.

## Tip: Implicit assertion
Cypress has a concept of implicit assertion. These kick in if a future command is erroring because of a previous command. E.g. the following will error at `contains` (after automatic retries of course) as nothing found can get `click`ed:

```ts
cy.get('#foo')
  // Once #foo is found the following:
  .contains('Submit')
  .click()
  // ^ Error: #foo does not have anything that `contains` `'Submit'`
```

In traditional frameworks you would get a horrible error like `click` doesn't exist on `null`. In Cypress you get a nice error `#foo` does not contain `Submit`. This error is a form of an implicit assertion.

## Tip: Waiting for an HTTP request
A lot of tests have been traditionally brittle due to all the arbitrary timeouts needed for XHRs that an application makes. `cy.server` makes it easy to
* create an alias for backend calls
* wait for them to occur

e.g.

```ts
cy.server()
  .route('POST', 'https://example.com/api/application/load')
  .as('load') // create an alias

// Start test
cy.visit('/')

// wait for the call
cy.wait('@load')

// Now the data is loaded
```

## Tip: Mocking an HTTP request response
You can also easily mock out a request response using `route`:
```ts
cy.server()
  .route('POST', 'https://example.com/api/application/load', /* Example payload response */{success:true});
```

### Tip: Asserting an Http request response
You can assert requests without mocking using `route` `onRequest` / `onResponse` e.g.

```ts
cy.route({
  method: 'POST',
  url: 'https://example.com/api/application/load',
  onRequest: (xhr) => {
    // Example assertion
    expect(xhr.request.body.data).to.deep.equal({success:true});
  }
})
```

## Tip: Mocking time
You can use `wait` to pause a test for some time e.g. to test an automatic "you are about to be logged out" notification screen:

```ts
cy.visit('/');
cy.wait(waitMilliseconds);
cy.get('#logoutNotification').should('be.visible');
```

However, it is recommended to mock time using `cy.clock` and forwarding time using `cy.tick` e.g.

```ts
cy.clock();

cy.visit('/');
cy.tick(waitMilliseconds);
cy.get('#logoutNotification').should('be.visible');
```

## Tip: Unit testing application code
You can also use cypress to unit test your application code in isolation e.g.

```js
import { once } from '../../../src/app/utils';

// Later
it('should only call function once', () => {
  let called = 0;
  const callMe = once(()=>called++);
  callMe();
  callMe();
  expect(called).to.equal(1);
});
```

## Tip: Mocking in unit testing
If you are unit testing modules in your application you can provide mocks using `cy.stub` e.g. if you want to ensure that `navigate` is called in a function `foo`:

* `foo.ts`

```ts
import { navigate } from 'takeme';

export function foo() {
  navigate('/foo');
}
```

* You can do this as in `some.spec.ts`:

```ts
/// <reference types="cypress"/>

import { foo } from '../../../src/app/foo';
import * as takeme from 'takeme';

describe('should work', () => {
  it('should stub it', () => {
    cy.stub(takeme, 'navigate');
    foo();
    expect(takeme.navigate).to.have.been.calledWith('/foo');
  });
});
```

## Tip: Command - execution separation
When you invoke a cypress command (or assertion) e.g. `cy.get('#something')`, the function immediately returns without actually carrying out the action. What it does do, is informs the cypress test runner that you will need to carry out (execute) an action (in this case a `get`) at some point.

You are basically building a command list that the runner will then go ahead and execute. You can verify this command - execution separation with a simple test, observe that you will see the `start / between / end` `console.log` statements execute immediately before the runner starts *executing* the commands:

```ts
/// <reference types="cypress"/>

describe('Hello world', () => {
  it('demonstrate command - execution separation', () => {
    console.log('start');
    cy.visit('http://www.google.com');
    console.log('between');
    cy.get('.gLFyf').type('Hello world');
    console.log('end');
  });
});
```

This command execution separation has two big benefits:
* The runner can execute the commands in a *flake resistant* manner with automatic retries and implicit assertions.
* Allows you to write asynchronous code in a synchronous fashion without having to do a constant *chaining* which results in difficult to maintain code.

## Tip: Breakpoint
The automatic snapshots + command log generated by the cypress test are great for debugging. That said you can pause test execution if you want.

First make sure you have chrome developer tools (lovingly called dev tools) open in the test runner (`CMD + ALT + i` on mac / `F12` on windows). Once the dev tools are open you can re-run the test and the dev tools will stay open. If you have the dev tools open, you can pause test execution in two ways:

* Application code breakpoints: Use a `debugger` statement in your application code and the test runner will stop on that just like standard web development.
* Test code breakpoints: You can use the `.debug()` command and cypress test execution will stop at it. Alternatively you can use a `debugger` statement in a `.then` command callback to cause a pause. e.g `.then(() => { debugger })`. You can even use it to grab some element `cy.get('#foo').then(($ /* a reference to the dom element */) => { debugger; })` or a network call e.g. `cy.request('https://someurl').then((res /* network response */) => { debugger });`. However idiomatic way is `cy.get('#foo').debug()` and then when the test runner is paused on `debug` you can click on the `get` in the command log to automatically `console.log` any information you might need about the `.get('#foo')` command (and similarly for any other commands you want to debug).

## Tip: Start server and test
If you need to start a local server before your tests can run you can add `start-server-and-test` https://github.com/bahmutov/start-server-and-test as a dependency. It takes the following arguments
* an npm script to *run* the server (aka server)
* an endpoint to check if the server has booted up (aka start)
* an npm script to initiate the testing (aka test)

Example package.json:
```json
{
    "scripts": {
        "start-server": "npm start",
        "run-tests": "mocha e2e-spec.js",
        "ci": "start-server-and-test start-server http://localhost:8080 run-tests"
    }
}
```

## Resources
* Website: https://www.cypress.io/
* Write your first cypress test (gives a nice tour of the cypress IDE) : https://docs.cypress.io/guides/getting-started/writing-your-first-test.html
* Setting up a CI environment (e.g. the provided docker image that works out of the box with `cypress run`): https://docs.cypress.io/guides/guides/continuous-integration.html
* Recipes (Lists recipes with descriptions. Click on headings to navigate to the source code for the recipe): https://docs.cypress.io/examples/examples/recipes.html
* Visual Testing : https://docs.cypress.io/guides/tooling/visual-testing.html
* Optionally set a `baseUrl` in cypress.json to [prevent an initial reload that happens after first `visit`.](https://github.com/cypress-io/cypress/issues/2542)
* Code coverage with cypress: [Webcast](https://www.youtube.com/watch?v=C8g5X4vCZJA)
