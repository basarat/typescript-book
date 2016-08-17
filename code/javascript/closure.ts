function outerFunction(arg) {
    var variableInOuterFunction = arg;

    function bar() {
        console.log(variableInOuterFunction); // Access a variable from the outer scope
    }

    // Call the local function to demonstrate that it has access to arg
    bar();
}

outerFunction("hello closure"); // logs hello closure!


export namespace another {
    function outerFunction(arg) {
        var variableInOuterFunction = arg;
        return function() {
            console.log(variableInOuterFunction);
        }
    }

    var innerFunction = outerFunction("hello closure!");

    // Note the outerFunction has returned
    innerFunction(); // logs hello closure!
}


export namespace revealing {
    function createCounter() {
        let val = 0;
        return {
            increment() { val++ },
            getVal() { return val }
        }
    }

    let counter = createCounter();
    counter.increment();
    console.log(counter.getVal()); // 1
}

export namespace server {
    server.on(function handler(req, res) {
        loadData(req.id).then(function(data) {
            // the `res` has been closed over and is available
            res.send(data);
        })
    });
}
