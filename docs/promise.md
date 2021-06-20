## Promise

`Promise` 클래스는 최신 자바스크립트 엔진에 존재하며 [polyfilled][polyfill]일 수 있습니다. promise의 주요 목표는 동기식 스타일 에러처리를 비동기 / 콜백 스타일 코드로 가져오는 것 입니다.

### Callback style code

promise를 제대로 이해하기위해 비동기 코드를 콜백만으로 신뢰할 수 있는 코드를 작성하는 것이 어렵다는 간단한 샘플이 있습니다. 파일에서 JSON을 로드하는 비동기 버전을 작성하는 간단한 경우를 생각해 보십시요. 이 동기식 버전은 간단할 수 있습니다.

```ts
import fs = require('fs')

function loadJSONSync(filename: string) {
    return JSON.parse(fs.readFileSync(filename))
}

// good json file
console.log(loadJSONSync('good.json'))

// non-existent file, so fs.readFileSync fails
try {
    console.log(loadJSONSync('absent.json'))
} catch (err) {
    console.log('absent.json error', err.message)
}

// invalid json file i.e. the file exists but contains invalid JSON so JSON.parse fails
try {
    console.log(loadJSONSync('invalid.json'))
} catch (err) {
    console.log('invalid.json error', err.message)
}
```

`loadJSONSync`는 3가지 동작 유효한 리턴값 파일, 시스템 에러, JSON.parse 에러가 있습니다. 우리는 에러를 try/catch를 사용해서 쉽게 조작할 수 있습니다. 이것은 동기식 프로그래밍 언어에 존재합니다. 지금 좋은 비동기식 버전의 함수를 만들수 있습니다. 에러를 체크하는데 괜찮은 방식입니다.

```ts
import fs = require('fs')

// A decent initial attempt .... but not correct. We explain the reasons below
function loadJSON(filename: string, cb: (error: Error, data: any) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) cb(err)
        else cb(null, JSON.parse(data))
    })
}
```

단순한 엔진, 그것은 콜백을 가지고 있습니다, 파일 시스템에서 에러를 콜백에 전달합니다. 만약 파일 시스템에 에러가 없다면 그것은 `JSON.parse`를 리턴합니다. 콜백에 기반한 비동기 함수를 작업할때 유의해야 할 점

1. 콜백을 두번 호출하지 마십시요.
1. 에러를 던지지 마십시요.

그러나 이 간단한 함수는 2가지의 포인트를 수용하지 못합니다. 사실 `JSON.parse`는 잘못된 JSON이 전달되고 콜백이 호출되지 않고 응용프로그램이 충돌하는 경우 에러를 던집니다. 아래에 예제를 통해서 입증하고 있습니다.

```ts
import fs = require('fs')

// A decent initial attempt .... but not correct
function loadJSON(filename: string, cb: (error: Error, data: any) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) cb(err)
        else cb(null, JSON.parse(data))
    })
}

// load invalid json
loadJSON('invalid.json', function(err, data) {
    // This code never executes
    if (err) console.log('bad.json error', err.message)
    else console.log(data)
})
```

이 문제를 해결하기 위한 간단한 방법은 `JSON.parse`를 try catch로 감싸는 것 입니다.

```ts
import fs = require('fs')

// A better attempt ... but still not correct
function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) {
            cb(err)
        } else {
            try {
                cb(null, JSON.parse(data))
            } catch (err) {
                cb(err)
            }
        }
    })
}

// load invalid json
loadJSON('invalid.json', function(err, data) {
    if (err) console.log('bad.json error', err.message)
    else console.log(data)
})
```

그것은 미묘한 버그를 가지고 있는 코드입니다. `JSON.parse`가 아닌 콜백함수 `cb`가 에러를 던집니다. 우리가 `try/catch`를 이용해서 감싸기 때문에 `catch`가 실행되고 다시 콜백을 호출합니다. 즉 두번 불렀습니다. 이것은 아래 예제에서 설명됩니다.

```ts
import fs = require('fs')

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) {
            cb(err)
        } else {
            try {
                cb(null, JSON.parse(data))
            } catch (err) {
                cb(err)
            }
        }
    })
}

// a good file but a bad callback ... gets called again!
loadJSON('good.json', function(err, data) {
    console.log('our callback called')

    if (err) console.log('Error:', err.message)
    else {
        // let's simulate an error by trying to access a property on an undefined variable
        var foo
        // The following code throws `Error: Cannot read property 'bar' of undefined`
        console.log(foo.bar)
    }
})
```

```bash
$ node asyncbadcatchdemo.js
our callback called
our callback called
Error: Cannot read property 'bar' of undefined
```

이것은 우리의 `loadJSON`함수에서 `try` 블록에서 콜백을 부당하게 감싸기 때문입니다. 여기서 기억해야 할 교훈이 있습니다.

> 간단한 강의: 콜백을 호출할때를 제외하고 try catch에 모든 동기식 코드를 포함하십시요.

이것은 간단한 강의입니다, 우리는 비동기 버전의 완전한 함수 `loadJSON`를 아래에서 설명하고 있습니다.

```ts
import fs = require('fs')

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) return cb(err)
        // Contain all your sync code in a try catch
        try {
            var parsed = JSON.parse(data)
        } catch (err) {
            return cb(err)
        }
        // except when you call the callback
        return cb(null, parsed)
    })
}
```

그것은 많은 보일러플레이트 중에서 어렵지않고 단순하고 좋은 에러 핸들링 코드입니다. 지금 자바스크립트 프로미스를 이용해서 비동기 처리를 더 나은 방향으로 할 수 있습니다.

## Creating a Promise

하나의 프로미스는 `대기` 혹은 `이행` 혹은 `실패` 중에 하나에 해당합니다.

![promise states and fates](https://raw.githubusercontent.com/basarat/typescript-book/master/images/promise%20states%20and%20fates.png)

프로미스를 생성에 대해서 살펴보겠습니다. 프로미스 생성자에 대해 `new`를 호출하는 것은 간단합니다. 프로미스 생성자는 상태를 결정하기 위해`resolve`와 `reject` 함수를 전달받습니다.

```ts
const promise = new Promise((resolve, reject) => {
    // the resolve / reject functions control the fate of the promise
})
```

### Subscribing to the fate of the promise

프로미스는 `.then`을 이용해서 resolved를 처리하고 `catch`를 사용해서 rejected를 구독할 수 있습니다.

```ts
const promise = new Promise((resolve, reject) => {
    resolve(123)
})
promise.then(res => {
    console.log('I get called:', res === 123) // I get called: true
})
promise.catch(err => {
    // This is never called
})
```

```ts
const promise = new Promise((resolve, reject) => {
    reject(new Error('Something awful happened'))
})
promise.then(res => {
    // This is never called
})
promise.catch(err => {
    console.log('I get called:', err.message) // I get called: 'Something awful happened'
})
```

> 프로미스 꿀팁

-   프로미스 resolved를 빠르게 생성하는 방법: `Promise.resolve(result)`
-   프로미스 rejected를 빠르게 생성하는 방법: `Promise.reject(error)`

### Chain-ability of Promises

체이닝 방식으로 프로미스를 **사용할때 얻는 이점**. 당신은 하나의 프로미스를 가지고 있고, `then`함수를 생성해서 프로미스를 체이닝해서 사용할 수 있습니다.

-   당신은 프로미스를 체이닝해서 어떤 함수라도 리턴할수 있고, resolved되면 `then`만 호출됩니다.

```ts
Promise.resolve(123)
    .then(res => {
        console.log(res) // 123
        return 456
    })
    .then(res => {
        console.log(res) // 456
        return Promise.resolve(123) // Notice that we are returning a Promise
    })
    .then(res => {
        console.log(res) // 123 : Notice that this `then` is called with the resolved value
        return 123
    })
```

-   당신은 체인에 대한 에러처리를 단일 `catch`를 이용해서 처리할 수 있습니다.

```ts
// Create a rejected promise
Promise.reject(new Error('something bad happened'))
    .then(res => {
        console.log(res) // not called
        return 456
    })
    .then(res => {
        console.log(res) // not called
        return 123
    })
    .then(res => {
        console.log(res) // not called
        return 123
    })
    .catch(err => {
        console.log(err.message) // something bad happened
    })
```

-   `catch`는 새로운 프로미스를 반환합니다. (새로운 프로미스는 체인을 효과적으로 생성합니다.)

```ts
// Create a rejected promise
Promise.reject(new Error('something bad happened'))
    .then(res => {
        console.log(res) // not called
        return 456
    })
    .catch(err => {
        console.log(err.message) // something bad happened
        return 123
    })
    .then(res => {
        console.log(res) // 123
    })
```

-   `then` (혹은 `catch`)를 이용해서 던져진 에러코드는 프로미스에서 실패하게 됩니다.

```ts
Promise.resolve(123)
    .then(res => {
        throw new Error('something bad happened') // throw a synchronous error
        return 456
    })
    .then(res => {
        console.log(res) // never called
        return Promise.resolve(789)
    })
    .catch(err => {
        console.log(err.message) // something bad happened
    })
```

-   주어진 오류에 관련된 가장 가까운 `catch`가 호출될때 에러를 전달받습니다. (catch가 새로운 프로미스 체인을 시작할때)

```ts
Promise.resolve(123)
    .then(res => {
        throw new Error('something bad happened') // throw a synchronous error
        return 456
    })
    .catch(err => {
        console.log('first catch: ' + err.message) // something bad happened
        return 123
    })
    .then(res => {
        console.log(res) // 123
        return Promise.resolve(789)
    })
    .catch(err => {
        console.log('second catch: ' + err.message) // never called
    })
```

-   `catch`는 체인에 오류가 있는 경우에만 호출됩니다.

```ts
Promise.resolve(123)
    .then(res => {
        return 456
    })
    .catch(err => {
        console.log('HERE') // never called
    })
```

사실은

-   `catch`를 사용할때 중간에 `then`을 호출하면 에러를 건너뛸수 있습니다.
-   `catch`를 사용하면 동기식으로 에러를 처리할 수 있습니다.

실제로 원시콜백보다 나은 에러처리를 허용하는 비동기 프로그래밍 패러다임을 제공합니다. 이에대한 자세한 내용은 아래를 참고하십시요.

### TypeScript and promises

타입스크립트의 장점은 프로미스 체인의 값의 흐름을 이해하는데 훌륭합니다.

```ts
Promise.resolve(123)
    .then(res => {
        // res is inferred to be of type `number`
        return true
    })
    .then(res => {
        // res is inferred to be of type `boolean`
    })
```

함수를 호출할때 리턴값이 프로미스일 경우 프로미스를 리턴합니다.

```ts
function iReturnPromiseAfter1Second(): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => resolve('Hello world!'), 1000)
    })
}

Promise.resolve(123)
    .then(res => {
        // res is inferred to be of type `number`
        return iReturnPromiseAfter1Second() // We are returning `Promise<string>`
    })
    .then(res => {
        // res is inferred to be of type `string`
        console.log(res) // Hello world!
    })
```

### Converting a callback style function to return a promise

함수를 호출을 프로미스로 감싸고

-   `reject` 만약 에러가 발생하면,
-   `resolve` 만약 모두 에러가 없다면.

예: `fs.readFile`을 감싸자

```ts
import fs = require('fs')
function readFileAsync(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, result) => {
            if (err) reject(err)
            else resolve(result)
        })
    })
}
```

장황하지않고 신뢰할 수 있는 코드를 작성하는 예제는 `setTimeout`를 프로미스로 변환하는 `delay`함수를 작성하는 것은 매우 쉽습니다.

```ts
const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
```

다음은 NodeJS에서 유용하고 멋진 프로미스를 반환하는 함수를 작성하는 방법입니다.

```ts
/** Sample usage */
import fs from 'fs'
import util from 'util'
const readFile = util.promisify(fs.readFile)
```

> 웹팩이 `util`모듈을 지원하고 브라우저에서도 사용할 수 있습니다.

Node 콜백 스타일 함수를 멤버로 가지고 있다면 잊지말고 `bind` 해주어야 올바른 `this` 가 적용됩니다: 

```ts
const dbGet = util.promisify(db.get).bind(db);
```

### Revisiting the JSON example

지금 다시 `loadJSON` 가지고 비동기 버전의 프로미스를 예제를 설명하겠습니다. 우리는 프로미스를 읽은다음 JSON으로 파싱합니다. 이것은 아래의 예제에서 설명하고 있습니다.

```ts
function loadJSONAsync(filename: string): Promise<any> {
    return readFileAsync(filename) // Use the function we just wrote
        .then(function(res) {
            return JSON.parse(res)
        })
}
```

이 섹션의 시작부분에 도입된 원래의 `sync` 버전과 얼마나 유사한지 지켜봐 주십시요.

```ts
// good json file
loadJSONAsync('good.json')
    .then(function(val) {
        console.log(val)
    })
    .catch(function(err) {
        console.log('good.json error', err.message) // never called
    })

    // non-existent json file
    .then(function() {
        return loadJSONAsync('absent.json')
    })
    .then(function(val) {
        console.log(val)
    }) // never called
    .catch(function(err) {
        console.log('absent.json error', err.message)
    })

    // invalid json file
    .then(function() {
        return loadJSONAsync('invalid.json')
    })
    .then(function(val) {
        console.log(val)
    }) // never called
    .catch(function(err) {
        console.log('bad.json error', err.message)
    })
```

`loadFile`(async) + `JSON.parse` (sync) => `catch` 이 구조를 사용하면 프로미스함수를 체인을 이용해서 손쉽게 통합할수 있습니다.
또한 콜백은 프로미스 체인에 의해 호출되엇으므로 `try/catch`를 이용해서 감싸는 실수를 하지 않습니다.

### Parallel control flow

우리는 일련의 비동기 작업과 시퀀스가 수행될때 프로미스가 얼마나 사소한지 보았습니다. 그 문제는 `then`을 이용한 체이닝 호출로 손쉽게 해결할 수 있습니다.

그러나 일련의 비동기 작업들을 실행한 후 이러한 작업의 결과로 무언가를 수행하려 할 수 있습니다. `Promise.all`함수를 이용해서 `Promise`에 숫자를 인자로 전달해서 실행할 수 있습니다. 프로미스를 배열형태로 실행하고 전달받는 값도 배열형태로 전달받습니다. 아래에 체이닝을 이용해서 잘 설명되어있습니다.

```ts
// an async function to simulate loading an item from some server
function loadItem(id: number): Promise<{ id: number }> {
    return new Promise(resolve => {
        console.log('loading item', id)
        setTimeout(() => {
            // simulate a server delay
            resolve({ id: id })
        }, 1000)
    })
}

// Chained / Sequential
let item1, item2;
loadItem(1)
    .then(res => {
        item1 = res
        return loadItem(2)
    })
    .then(res => {
        item2 = res
        console.log('done')
    }) // overall time will be around 2s

// Concurrent / Parallel
Promise.all([loadItem(1), loadItem(2)])
    .then((res) => {
        [item1, item2] = res;
        console.log('done');
    }); // overall time will be around 1s
```

때때로, 당신은 비동기를 연속적으로 실행해야 할 수도 있습니다. 그러나 이러한 작업중 하나가 해결되는 한 필요한 모든 것을 얻을 수 있습니다. 아래에 `Promise.race`함수를 이용해서 `Promise`를 주입하는 방법을 설명하고 있습니다.

```ts
var task1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'one')
})
var task2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 2000, 'two')
})

Promise.race([task1, task2]).then(function(value) {
    console.log(value) // "one"
    // Both resolve, but task1 resolves faster
})
```

[polyfill]: https://github.com/stefanpenner/es6-promise
