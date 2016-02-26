#### `super`

Note that if you call `super` on a child class it is redirected to the `prototype` as shown below:

```ts
class Base {
    log() { console.log('hello world'); }
}

class Child extends Base {
    log() { super.log() };
}
```
generates:

```js
var Base = (function () {
    function Base() {
    }
    Base.prototype.log = function () { console.log('hello world'); };
    return Base;
})();
var Child = (function (_super) {
    __extends(Child, _super);
    function Child() {
        _super.apply(this, arguments);
    }
    Child.prototype.log = function () { _super.prototype.log.call(this); };
    return Child;
})(Base);

```
Notice `_super.prototype.log.call(this)`.

This means that you cannot use `super` on member properties. Instead you should just use `this`.

```ts
class Base {
    log = () => { console.log('hello world'); }
}

class Child extends Base {
    logWorld() { this.log() };
}
```

Notice since there is only one `this` shared between the `Base` and the `Child` class you need to use *different* names (here `log` and `logWorld`).

Also Note that TypeScript will warn you if you try to misuse `super`:

```ts
module quz {
    class Base {
        log = () => { console.log('hello world'); }
    }

    class Child extends Base {
        // ERROR : only `public` and `protected` methods of base class are accessible via `super`
        logWorld() { super.log() };
    }
}
```
