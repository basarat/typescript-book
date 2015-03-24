export var asdfasdfasfadf = 123;

module first {
    let something = [1, 2, 3];


}

module second {
    var foo = 123;
    if (true) {
        var foo = 456;
    }
    console.log(foo); // 456
}

module third {
    var foo = 123;
    function test() {
        var foo = 456;
    }
    test();
    console.log(foo); // 123
}

module fourth {
    var index = 0;
    var array = [1, 2, 3];
    for (let index = 0; index < array.length; index++) {
        console.log(array[index]);
    }
    console.log(index); // 0
}

module fifth {
    if (true) {
        let foo = 123;
    }
}

module fifth {
    var foo = '123';
    if (true) {
        let foo = 123;
    }
}

module closures {
    var funcs = [];
    // create a bunch of functions
    for (var i = 0; i < 3; i++) {
        funcs.push(function() {
            console.log(i);
        })
    }
    // call them
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
}

module closures2 {
    var funcs = [];
    // create a bunch of functions
    for (var i = 0; i < 3; i++) {
        (function() {
            var local = i;
            funcs.push(function() {
                console.log(local);
            })
        })();
    }
    // call them
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
}

module closures3 {
    var funcs = [];
    // create a bunch of functions
    for (let i = 0; i < 3; i++) { // Error : loop contains 
        funcs.push(function() {
            console.log(i);
        })
    }
    // call them
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
}