## Async Await

> [Profesjonalny kurs wideo egghead, który obejmuje ten sam materiał](https://egghead.io/courses/async-await-using-typescript)

Jako eksperyment myślowy wyobraź sobie takie coś: sposób na poinformowanie środowiska wykonawczego JavaScript, aby wstrzymało wykonanie kodu słowa kluczowego `await`, gdy jest używane w ramach obietnicy (promise), i wznowiło *tylko* raz (i jeśli) obietnica zwrócona z funkcji jest ustalona:

```ts
// Not actual code. A thought experiment
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

Kiedy obietnica się zakończy, realizacja trwa,
* jeśli zostało spełnione, await zwróci wartość,
* jeśli zostanie odrzucone, błąd zostanie wyrzucony synchronicznie, który możemy złapać.

To nagle (i magicznie) sprawia, że programowanie asynchroniczne jest tak proste, jak programowanie synchroniczne. Trzy rzeczy potrzebne do tego eksperymentu myślowego to:

* Możliwość *wykonania funkcji pauzy*.
* Możliwość *wstawienia wartości do* funkcji.
* Możliwość *rzucenia wyjątku wewnątrz* funkcji.

Właśnie na to pozwoliły nam generatory! Eksperyment myślowy *jest aktualnie rzeczywisty*, podobnie jak implementacja `async`/`await` w TypeScript / JavaScript. Pod przykryciem używa tylko generatorów.

### Wygenerowany JavaScript

Nie musisz tego rozumieć, ale jest to dość proste, jeśli [przeczytałeś o generatorach][generators]. Funkcję `foo` można prosto opakować w następujący sposób:

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

Tam gdzie `wrapToReturnPromise` po prostu wykonuje funkcję generatora, aby uzyskać `generator` i wtedy użyć `generator.next()`, jeśli wartość jest `promise` byłoby `then`+`catch` obietnicy i w zależności od wyniku wywołania `generator.next(result)` lub `generator.throw(error)`. To wszystko!



### Wsparcie Async Await w TypeScript
**Async - Await** jest obsługiwane przez [TypeScript od wersji 1.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html). Funkcje asynchroniczne są poprzedzone słowem kluczowym *async*; *await* zawiesza wykonanie do momentu spełnienia obietnicy powrotu funkcji asynchronicznej i rozpakowuje wartość ze zwróconej *obietnicy*.
Obsługiwane było tylko w przypadku transpilacji **docelowej ES6** bezpośrednio do **generatorów ES6**.

**TypeScript 2.1** [dodano możliwość uruchamiania ES3 i ES5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html), co oznacza, że będziesz mógł z niego korzystać bez względu na to, z jakiego środowiska korzystasz. Należy zauważyć, że możemy używać async / await na TypeScript 2.1, i wiele przeglądarek jest oczywiście obsługiwanych, ponieważ globalnie dodano **polyfill dla Promise**.

Zobaczmy ten **przykład** i spójrzmy na ten kod, aby dowiedzieć się, jak działa async / await **notacji** TypeScript:

```ts
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

// async function always returns a Promise
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");

    for (let i = 0; i < 5; i++) {
        // await is converting Promise<number> into number
        const count:number = await delay(500, i);
        console.log(count);
    }

    console.log("World!");
}

dramaticWelcome();
```

**Transpilowanie do ES6 (--target es6)**
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
// async function always returns a Promise
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Hello");
        for (let i = 0; i < 5; i++) {
            // await is converting Promise<number> into number
            const count = yield delay(500, i);
            console.log(count);
        }
        console.log("World!");
    });
}
dramaticWelcome();
```
Możesz zobaczyć pełny przykład [tutaj][asyncawaites6code].


**Transpilowanie do ES5 (--target es5)**
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
        if (f) throw new TypeError("Generator is already executing.");
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
// async function always returns a Promise
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
Możesz zobaczyć pełny przykład [tutaj][asyncawaites5code].


**Uwaga**: w obu scenariuszach docelowych musimy upewnić się, że nasze środowisko wykonawcze ma obietnicę zgodną z ECMAScript dostępną na całym świecie. Może to obejmować złapanie polifillu dla obietnicy. Musimy także upewnić się, że TypeScript wie, że istnieje Promise, ustawiając flagę lib na coś podobnego do "dom", "es2015" lub "dom", "es2015.promise", "es5". 

**Widzimy, jakie przeglądarki mają obsługę Promise (natywną i polyfilled) [tutaj](https://kangax.github.io/compat-table/es6/#test-Promise).**

[generatory]:./generators.md
[asyncawaites5code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es5/asyncAwaitES5.js
[asyncawaites6code]:https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es6/asyncAwaitES6.js
