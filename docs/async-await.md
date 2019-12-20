## Async Await

> [동일한 자료를 다루는 프로 에그비디오 코스](https://egghead.io/courses/async-await-using-typescript)

Promise가 사용될때 `await` 키워드에서 코드 실행을 일시적으로 중지하고, 함수에서 반환된 Promise가 가능한 한번만 실행되도록 Javascript 런타임에 명령하는 방법을 실험으로 가정해봅니다:

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

Promise가 수행을 계속한다면,
- 만약 await가 실행된다면, 값을 반환하며,
- 에러로 인하여 reject 된다면 catch에서 잡을 수 있도록 에러를 반환합니다.

이러한 수행은 갑자기 (신기할정도로) 비동기 프로그램을 동기프로그래밍처럼 쉽게 만들고 있습니다. 이러한 실험에는 세가지 사항이 필요합니다.

-   함수를 일시 중지하는 기능
-   함수안의 값을 출력하는 기능
-   함수내의 예외를 던질 수 있는 기능

이것은 꼭 제네레이터가 실행되는 원리 같습니다! 이러한 실험은 실제 발생할 수 있으며, Typescript / Javascript의 `async`/`await`에 대한 구현입니다. 실제로 async/await는 제네레이터를 사용하여 구현됩니다.

### Generated JavaScript

이 원리를 꼭 이해할 필요는 없지만, [제네레이터][generators]를 읽었다면, 간단히 이해할 수 있습니다. `foo` 함수는 다음과 같이 간단히 정리할 수 있습니다.

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

`wrapToReturnPromise`는 제네레이터 함수를 사용하여 `generator` 객체를 반환받은 다음, `generator.next()`를 사용합니다. 만약 값이 `promise` 라면 `then`+`catch`하고 결과값을 `generator.next(result)`또는 `generator.thorw(error)` 로 호출해야 합니다. 그게 전부입니다.

### Async Await Support in TypeScript

**Async - Await** 다음을 지원합니다. [TypeScript since version 1.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-7.html). 비동기는 함수앞에는 _async_ 키워드가 접두어로 붙습니다. *await*는 비동기 함수가 프로미스를 반환할때까지 실행을 일시 중단하고 반환된 프로미스 내부로부터 값을 반환받을 수 있습니다.

**ES6 generators**는 트랜스파일링을 통해 오직 **es6**를 지원합니다.

**TypeScript 2.1** [added the capability to ES3 and ES5 run-times](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html)은 ES3 및 ES5 런타임에 제네레이터 기능을 추가했습니다. 즉, 사용중인 환경에 관계없이 자유롭게 활용이 가능합니다. Typescript2.1에서 async/await를 사용할 수 잇으며, **Promise**에 대한 **polyfill**을 전역으로 추가하여 다양한 브라우저에 대응할 수 있습니다.

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

**ES6로 트랜스파일링하기 (--target es6)**

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

전체 예제는 [여기][asyncawaites6code]에서 확인하실 수 있습니다.

**ES5로 트랜스파일링 하기 (--target es5)**

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

전체 예제는 [여기][asyncawaites5code]에서 확인하실 수 있습니다.

**참고**: 두가지(ES6, ES5) 시나리오 모두에 대해서 런타임에 ECMAScript가 호환되는 Promise를 전역에 사용할 수 있는지 확인해야 합니다. 이 경우 Promise용 polyfill을 설정해야 할 수도 있습니다. 또한, tsc내 lib 플래그를 "dom", "es2015" 또는 "dom", "es2015.promise", "es5"와 같은 형식으로 설정하여 Typescript에 Promise가 포함되어 있음을 확인해야 합니다.
**우리는 브라우저가 native 혹은 polyfill을 이용하여 프로미스를 지원하는지 볼수 있습니다. [여기](https://kangax.github.io/compat-table/es6/#test-Promise)를 클릭해주세요**

[generators]: ./generators.md
[asyncawaites5code]: https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es5/asyncAwaitES5.js
[asyncawaites6code]: https://cdn.rawgit.com/basarat/typescript-book/705e4496/code/async-await/es6/asyncAwaitES6.js
