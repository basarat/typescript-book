## Async Await

> [A PRO egghead видеокурс охватывающий этот же материал](https://egghead.io/courses/async-await-using-typescript)

В качестве мысленного эксперимента представьте себе: способ сказать среде выполнения JavaScript приостановить выполнение кода по ключевому слову `await` при использовании вместе с промисом и возобновить *только* единожды (и если) промис выполнен:

```ts
// Псевдокод. Мысленный эксперимент
async function foo() {
    try {
        var val = await getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
}
```

Когда промис завершён, выполнение функции продолжается,
* если он исполнен, то await вернет значение,
* если он отклонен, синхронно будет выброшена ошибка, которую мы можем отловить.

Это неожиданно (и волшебным образом) делает асинхронное программирование таким же простым, как синхронное программирование. Для этого мысленного эксперимента необходимы три вещи:

* Возможность *приостановить выполнение* функции.
* Возможность *поместить значение внутри* функции.
* Возможность *бросить исключение внутри* функции.

Это именно то, что генераторы позволили нам сделать! Мысленный эксперимент *на самом деле реален*, как и реализация `async`/`await` в TypeScript / JavaScript. Под капотом просто используются генераторы.

### Сгенерированный JavaScript

Вам не обязательно это понимать, но это довольно просто, если вы [почитаете о генераторах][generators]. Функцию `foo` можно просто обернуть следующим образом:

```ts
const foo = wrapToReturnPromise(function* () {
    try {
        var val = yield getMeAPromise();
        console.log(val);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
});
```

где `wrapToReturnPromise` просто выполняет функцию генератора для получения `generator` и затем использует `generator.next()`, если значение является `promise`, то оно выполнит `then` + `catch` промиса и в зависимости от результата вызовет `generator.next(result)` или `generator.throw(error)`. Вот и всё!



### Async Await поддержка в TypeScript
**Async - Await** поддерживается [TypeScript начиная с версии 1.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html). Асинхронные функции начинаются с ключевого слова *async*; *await* приостанавливает выполнение, пока не будет получено значение из *Promise*.
Ранее async / await поддерживался только в **es6**, и транспилировался непосредственно в **ES6 generators**.

**TypeScript 2.1** [добавлена возможность выполнения в ES3 и ES5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html), что означает, что вы можете использовать async / await независимо от того, какую среду вы используете. Важно отметить, что мы можем использовать async / await с TypeScript 2.1, и многие браузеры их поддерживают, конечно, сперва добавив глобально **полифилл для Promise**.

Давайте посмотрим этот **пример** и код, чтобы выяснить, как работает TypeScript async / await **нотация**:
```ts
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

// асинхронная функция всегда возвращает Promise
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");

    for (let i = 0; i < 5; i++) {
        // await преобразует Promise<number> в число
        const count:number = await delay(500, i);
        console.log(count);
    }

    console.log("World!");
}

dramaticWelcome();
```

**Транспиляция в ES6 (--target es6)**
```js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function delay(milliseconds, count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(count);
        }, milliseconds);
    });
}
// асинхронная функция всегда возвращает Promise
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Hello");
        for (let i = 0; i < 5; i++) {
            // await преобразует Promise <число> в число
            const count = yield delay(500, i);
            console.log(count);
        }
        console.log("World!");
    });
}
dramaticWelcome();
```
Вы можете увидеть полный пример [здесь][asyncawaites6code].


**Транспиляция в ES5 (--target es5)**
```js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Генератор уже выполняется.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function delay(milliseconds, count) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(count);
        }, milliseconds);
    });
}
// асинхронная функция всегда возвращает Promise
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function () {
        var i, count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Hello");
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, delay(500, i)];
                case 2:
                    count = _a.sent();
                    console.log(count);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log("World!");
                    return [2 /*return*/];
            }
        });
    });
}
dramaticWelcome();
```
Вы можете увидеть полный пример [здесь][asyncawaites5code].

**Примечание**: для обоих сценариев применения нам необходимо убедиться, что наш исполняемый код имеет глобальный доступ к ECMAScript-совместимому Promise. Как вариант это может быть использование полифилла для Promise. Мы также должны убедиться, что TypeScript знает, что Promise поддерживается, установив для нашего флага lib что-то вроде «dom», «es2015» или «dom», «es2015.promise», «es5».
**Мы можем увидеть, какие браузеры имеют поддержку Promise (нативную и заполифилленую) [здесь](https://kangax.github.io/compat-table/es6/#test-Promise).**

[generators]:./generators.md
[asyncawaites5code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es5/asyncAwaitES5.js
[asyncawaites6code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es6/asyncAwaitES6.js
