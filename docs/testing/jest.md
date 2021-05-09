# Using Jest with TypeScript

> [Pro egghead lesson on Jest / TypeScript](https://egghead.io/lessons/typescript-getting-started-with-jest-using-typescript)

No testing solution out there is perfect. That said, jest is an excellent unit testing option which provides great TypeScript support.

> Note: We assume you start off with a simple node package.json setup. Also all TypeScript files should be in a `src` folder which is always recommended (even without Jest) for a clean project setup.

## Step 1: Install

Install the following using npm:

```shell
npm i jest @types/jest ts-jest typescript -D
```

Explanation:

* Install `jest` framework (`jest`)
* Install the types for `jest` (`@types/jest`)
* Install the TypeScript preprocessor for jest (`ts-jest`) which allows jest to transpile TypeScript on the fly and have source-map support built in.
* Install the TypeScript compiler ('typescript') which is prerequisite for 'ts-jest'.
* Save all of these to your dev dependencies (testing is almost always a npm dev-dependency)

## Step 2: Configure Jest

Add the following `jest.config.js` file to the root of your project:

```js
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
```

(If your `package.json` file contains `"type": "module"`, which causes Node to assume modules are in es6 format, you can convert the above to es6 format by replacing the top line to `export default { ` .)

Explanation:

* We always recommend having *all* TypeScript files in a `src` folder in your project. We assume this is true and specify this using the `roots` option.
* The `testMatch` config is a glob pattern matcher for discovering .test / .spec files in ts / tsx / js format.
* The `transform` config just tells `jest` to use `ts-jest` for ts / tsx files.

## Step 3: Run tests

Run `npx jest` from your project root and jest will execute any tests you have.

### Optional: Add script target for npm scripts

Add `package.json`:

```json
{
  "test": "jest"
}
```

* This allows you to run the tests with a simple `npm t`.
* And even in watch mode with `npm t -- --watch`.

### Optional: Run jest in watch mode

* `npx jest --watch`

### Example

* For a file `foo.ts`:

    ```js
    export const sum
      = (...a: number[]) =>
        a.reduce((acc, val) => acc + val, 0);
    ```

* A simple `foo.test.ts`:

    ```js
    import { sum } from '../foo';

    test('basic', () => {
      expect(sum()).toBe(0);
    });

    test('basic again', () => {
      expect(sum(1, 2)).toBe(3);
    });
    ```

Notes:

* Jest provides the global `test` function.
* Jest comes prebuilt with assertions in the form of the global `expect`.

### Example async

Jest has built-in async/await support. e.g.

```js
test('basic',async () => {
  expect(sum()).toBe(0);
});

test('basic again', async () => {
  expect(sum(1, 2)).toBe(3);
}, 1000 /* optional timeout */);
```

### Example enzyme

> [Pro egghead lesson on Enzyme / Jest / TypeScript](https://egghead.io/lessons/react-test-react-components-and-dom-using-enzyme)

Enzyme allows you to test react components with dom support. There are three steps to setting up enzyme:

1. Install enzyme, types for enzyme, a better snapshot serializer for enzyme, enzyme-adapter-react for your react version `npm i enzyme @types/enzyme enzyme-to-json enzyme-adapter-react-16 -D`
2. Add `"snapshotSerializers"` and `"setupTestFrameworkScriptFile"` to your `jest.config.js`:  

    ```js
    module.exports = {
      // OTHER PORTIONS AS MENTIONED BEFORE

      // Setup Enzyme
      "snapshotSerializers": ["enzyme-to-json/serializer"],
      "setupFilesAfterEnv": ["<rootDir>/src/setupEnzyme.ts"],
    }
    ```

3. Create `src/setupEnzyme.ts` file.

    ```js
    import { configure } from 'enzyme';
    import EnzymeAdapter from 'enzyme-adapter-react-16';
    configure({ adapter: new EnzymeAdapter() });
    ```

Now here is an example react component and test:

* `checkboxWithLabel.tsx`:

    ```ts
    import * as React from 'react';

    export class CheckboxWithLabel extends React.Component<{
      labelOn: string,
      labelOff: string
    }, {
        isChecked: boolean
      }> {
      constructor(props) {
        super(props);
        this.state = { isChecked: false };
      }

      onChange = () => {
        this.setState({ isChecked: !this.state.isChecked });
      }

      render() {
        return (
          <label>
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.onChange}
            />
            {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
          </label>
        );
      }
    }

    ```

* `checkboxWithLabel.test.tsx`:

    ```ts
    import * as React from 'react';
    import { shallow } from 'enzyme';
    import { CheckboxWithLabel } from './checkboxWithLabel';

    test('CheckboxWithLabel changes the text after click', () => {
      const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

      // Interaction demo
      expect(checkbox.text()).toEqual('Off');
      checkbox.find('input').simulate('change');
      expect(checkbox.text()).toEqual('On');

      // Snapshot demo
      expect(checkbox).toMatchSnapshot();
    });
    ```

## Reasons why we like jest

> [For details on these features see jest website](http://facebook.github.io/jest/)

* Built-in assertion library.
* Great TypeScript support.
* Very reliable test watcher.
* Snapshot testing.
* Built-in coverage reports.
* Built-in async/await support.
