## Closure

자바스크립트에서 얻은 가장 좋은 점은 클로저였습니다. 클로저는 외부 변수에도 스코프 밖에서 접근할 수 있게 해줍니다. 클로저는 사용하는 가장 좋은 방법을 설명합니다.

```ts
function outerFunction(arg) {
    var variableInOuterFunction = arg

    function bar() {
        console.log(variableInOuterFunction) // Access a variable from the outer scope
    }

    // Call the local function to demonstrate that it has access to arg
    bar()
}

outerFunction('hello closure') // logs hello closure!
```

내부 함수가 외부 스코프의 변수에 접근할 수 있음을 예제를 통해 알 수 있습니다. 외부 함수의 변수는 내부 함수에 의해서만 접근이 가능합니다.
그러므로 클로저라는 용어로 사용되고 그 자체로 개념은 꽤 직관적입니다.

중요한 부분: 내부 함수는 외부 함수가 반환한 후에도 외부 스코프의 변수에 접근할 수 있습니다. 이것은 내부 함수가 외부 변수에 여전히 묶여있고 외부 함수에 의존적이지 않기 때문입니다. 다시 예제를 보겠습니다.

```ts
function outerFunction(arg) {
    var variableInOuterFunction = arg
    return function() {
        console.log(variableInOuterFunction)
    }
}

var innerFunction = outerFunction('hello closure!')

// Note the outerFunction has returned
innerFunction() // logs hello closure!
```

### 클로저가 엄청난 이유

그것은 객체를 쉽게 구성할 수 있도록 하고 모듈 패턴으로 구성됩니다.

```ts
function createCounter() {
    let val = 0
    return {
        increment() {
            val++
        },
        getVal() {
            return val
        }
    }
}

let counter = createCounter()
counter.increment()
console.log(counter.getVal()) // 1
counter.increment()
console.log(counter.getVal()) // 2
```

높은 수준에서 Node.js와 같은 것을 만들 수 있습니다.🌹

```ts
// Pseudo code to explain the concept
server.on(function handler(req, res) {
    loadData(req.id).then(function(data) {
        // the `res` has been closed over and is available
        res.send(data)
    })
})
```
