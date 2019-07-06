## Async Await

> [동일한 자료를 다루는 프로 에그비디오 코스](https://egghead.io/courses/async-await-using-typescript)

다음의 실험적인 상상: 자바스크립트는 실행중에 `await`코드를 입력하면 중지 할 수 있습니다. 이것은 프로미스에서 사용되며 단 하나의 프로미스 함수를 반환합니다.

```ts
// Not actual code. A thought experiment
async function foo() {
    try {
        var val = await getMeAPromise()
        console.log(val)
    } catch (err) {
        console.log('Error: ', err.message)
    }
}
```

프로미스가 해결되면 실행은 계속 됩니다.

-   만약 그것은 await가 수행되면 값을 반환합니다.
-   만약 그것이 reject 되었다면 에러를 동기적으로 던질것 입니다. 우리는 catch에서 에러를 받을 수 있습니다.

갑자기(그리고 이상하게) 비동기 프로그래밍이 동기 프로그래밍 만큼 쉽게 만듭니다. 대신 아래의 세가지가 필요합니다.

-   함수를 일시 중지하는 기능
-   함수안의 값을 출력하는 기능
-   함수내의 예외를 던질 수 있는 기능

이것은 정확하게 제네레이터가 우리에게 허용한 것 입니다.
This is exactly what generators allowed us to do! The thought experiment _is actually real_ and so is the `async`/`await` implementation in TypeScript / JavaScript. Under the covers it just uses generators.

### Generated JavaScript

당신은 이것을 이해할 수 필요가 없습니다. 하지만 당신이 제네레이터를 읽었다면 꽤 간단합니다. [제네레이터][generators]. 다음의`foo` 함수는 간단하게 감쌀수 있습니다.

```ts
const foo = wrapToReturnPromise(function*() {
    try {
        var val = yield getMeAPromise()
        console.log(val)
    } catch (err) {
        console.log('Error: ', err.message)
    }
})
```

`wrapToReturnPromise` 는 제네레이터 함수를 실행하여 `generator`를 얻은 다음 `generator.next()`를 사용합니다. 만약 값이 `promise` 라면 `then`+`catch`하고 결과값을 `generator.next(result)`또는 `generator.thorw(error)` 로 호출해야 합니다.
그게 전부입니다.

### Async Await Support in TypeScript

**Async - Await** 다음을 지원합니다. [TypeScript since version 1.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html). 비동기는 함수앞에는 _async_ 키워드가 접두어로 붙습니다. *await*는 비동기 함수가 프로미스를 반환할때까지 실행을 일시 중단하고 반환된 프로미스 내부로부터 값을 반환받을 수 있습니다.

**ES6 generators**는 트랜스파일링을 통해 오직 **es6**를 지원합니다.

**TypeScript 2.1** [added the capability to ES3 and ES5 run-times](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html), 의미는 당신은 항상 자유로운 이점을 가지고 있고 그것은 아무 문제없이 어떤 환경에서도 사용할수 있습니다. 중요한 공지를 하자면 우리는 타입스크립트 2.1과 함께 async / await 를 사용할 수 있다는 것을 알아두는 것이 중요합니다. 물론 **promise**에 대해 **polyfill**을 전역으로 추가하여 많은 브라우저가 지원됩니다.

**예제**를 보고 타입스크립트에서 async /await 표기법이 어떻게 작동하는지 알아봅니다.

```ts
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(count)
        }, milliseconds)
    })
}

// async function always returns a Promise
async function dramaticWelcome(): Promise<void> {
    console.log('Hello')

    for (let i = 0; i < 5; i++) {
        // await is converting Promise<number> into number
        const count: number = await delay(500, i)
        console.log(count)
    }

    console.log('World!')
}

dramaticWelcome()
```

**Transpiling to ES6 (--target es6)**

```js
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value)
                      }).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
function delay(milliseconds, count) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(count)
        }, milliseconds)
    })
}
// async function always returns a Promise
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function*() {
        console.log('Hello')
        for (let i = 0; i < 5; i++) {
            // await is converting Promise<number> into number
            const count = yield delay(500, i)
            console.log(count)
        }
        console.log('World!')
    })
}
dramaticWelcome()
```

당신은 전체 예제를 볼 수 있습니다. [여기][asyncawaites6code].

**Transpiling to ES5 (--target es5)**

```js
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value))
                } catch (e) {
                    reject(e)
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value))
                } catch (e) {
                    reject(e)
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : new P(function(resolve) {
                          resolve(result.value)
                      }).then(fulfilled, rejected)
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            )
        })
    }
var __generator =
    (this && this.__generator) ||
    function(thisArg, body) {
        var _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1]
                    return t[1]
                },
                trys: [],
                ops: []
            },
            f,
            y,
            t,
            g
        return (
            (g = { next: verb(0), throw: verb(1), return: verb(2) }),
            typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                    return this
                }),
            g
        )
        function verb(n) {
            return function(v) {
                return step([n, v])
            }
        }
        function step(op) {
            if (f) throw new TypeError('Generator is already executing.')
            while (_)
                try {
                    if (
                        ((f = 1),
                        y &&
                            (t =
                                y[
                                    op[0] & 2
                                        ? 'return'
                                        : op[0]
                                        ? 'throw'
                                        : 'next'
                                ]) &&
                            !(t = t.call(y, op[1])).done)
                    )
                        return t
                    if (((y = 0), t)) op = [0, t.value]
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op
                            break
                        case 4:
                            _.label++
                            return { value: op[1], done: false }
                        case 5:
                            _.label++
                            y = op[1]
                            op = [0]
                            continue
                        case 7:
                            op = _.ops.pop()
                            _.trys.pop()
                            continue
                        default:
                            if (
                                !((t = _.trys),
                                (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
                                _ = 0
                                continue
                            }
                            if (
                                op[0] === 3 &&
                                (!t || (op[1] > t[0] && op[1] < t[3]))
                            ) {
                                _.label = op[1]
                                break
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1]
                                t = op
                                break
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2]
                                _.ops.push(op)
                                break
                            }
                            if (t[2]) _.ops.pop()
                            _.trys.pop()
                            continue
                    }
                    op = body.call(thisArg, _)
                } catch (e) {
                    op = [6, e]
                    y = 0
                } finally {
                    f = t = 0
                }
            if (op[0] & 5) throw op[1]
            return { value: op[0] ? op[1] : void 0, done: true }
        }
    }
function delay(milliseconds, count) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(count)
        }, milliseconds)
    })
}
// async function always returns a Promise
function dramaticWelcome() {
    return __awaiter(this, void 0, void 0, function() {
        var i, count
        return __generator(this, function(_a) {
            switch (_a.label) {
                case 0:
                    console.log('Hello')
                    i = 0
                    _a.label = 1
                case 1:
                    if (!(i < 5)) return [3 /*break*/, 4]
                    return [4 /*yield*/, delay(500, i)]
                case 2:
                    count = _a.sent()
                    console.log(count)
                    _a.label = 3
                case 3:
                    i++
                    return [3 /*break*/, 1]
                case 4:
                    console.log('World!')
                    return [2 /*return*/]
            }
        })
    })
}
dramaticWelcome()
```

당신은 전체 예제를 볼 수 있습니다. [here][asyncawaites5code].

**메모**: 두가지 예상 시나리오, 우리는 ECMA스크립트를 컴파일된 코드가 런타임에서 전역으로 필요합니다. 우리는 타입스크립트에서 프로미스가 존재하는 것을 알고 있습니다. 우리는 또한 lib 플래그를 "dom", "es2015" 또는 "dom", "es2015.promise", "es5"와 같은 것으로 설정하여 타입스크립트가 프로미스를 인식하는지 확인해야 합니다.
**우리는 브라우저가 프로미스를 지원하는지 볼수 있습니다. (native 그리고 polyfilled) [여기](https://kangax.github.io/compat-table/es6/#test-Promise)**

[generators]: ./generators.md
[asyncawaites5code]: https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es5/asyncAwaitES5.js
[asyncawaites6code]: https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es6/asyncAwaitES6.js
