# Why Cypress
Cypress is a great E2E testing tool. Here are a few great reasons to consider it:

* A single npm install.
* Provides a nice interactive google chrome debug experience. This is very similar to how UI devs mostly work manually.
* Provides the ability to mock out backend XHR with fixtures, this allows easier data setup and tested error handling in real live application code.
* First class TypeScript support. Ships with TypeScript definitions *and* ability to write tests in TypeScript out of the box.

## Installation

Create an e2e directory and install cypress and typescript:

```sh
mkdir e2e
cd e2e
npm init -y
npm install cypress typescript
npx tsc --init
```

Here are a few reasons for creating a seperate `e2e` folder especially for cypress: 
* Creating a seperate directory or `e2e` makes it easier to isolate its `package.json` dependencies from the rest of your project. This results in less dependency conflicts.
* Testing frameworks have a habit of polluting the global namespace with stuff like `describe` `it` `expect`. It is best to keep the e2e category `tsconfig.json` seperate to prevent global type definition conflicts.

## `package.json` Scripts: 

Add a few scripts to the `e2e/package.json` file:

```json
"scripts": {
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

## Running in development
Open the cypress IDE using the following command.

```sh
npm run cypress:open
```

This will setup the project for you with the cypress folder.

## Key Files
Under the `e2e` folder you now have these files: 

* `/cypress.json`: Configure cypress. The default is empty and that is all you need.
* `/cypress` Subfolders: 
    * `/integration`: All your tests. 
        * Comes with an `examples` folder. You can safely delete it.
        * Name tests with `.spec.ts` e.g. `something.spec.ts`. 
        * Feel free to create tests under subfolders for better organization e.g. `/someFeatureFolder/something.spec.ts`.

## First test 
* create a file `/cypress/integration/first.spec.ts` with the following contents: 

```ts
/// <reference types="cypress"/>

describe('google search', () => {
  it('should work', () => {
    cy.visit('http://www.google.com');
    cy.get('#lst-ib').type('Hello world{enter}')
  });
});
```

## Running on a build server

You can run cypress tests in ci mode using `npm run cypress:run`.

## Tip: Waiting for an HTTP request
A lot of tests have been traditially brittle due to all arbitrary timeouts needed for XHRs that an application makes. `cy.server` makes it easy to 
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

## Resources 
* Website: https://www.cypress.io/
* Recipes: https://docs.cypress.io/examples/examples/recipes.html. Lists recipies with descriptions. Click on headings to navigate to the source code for the recipe.
